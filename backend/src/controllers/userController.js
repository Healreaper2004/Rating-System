const { Store, Rating } = require("../models");
const { fn, col } = require("sequelize");

const { Op } = require("sequelize");

exports.getStores = async (req, res) => {
  try {
    const { search, address } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.name = {
        [Op.like]: `%${search}%`,
      };
    }

    if (address) {
      whereClause.address = {
        [Op.like]: `%${address}%`,
      };
    }

    const stores = await Store.findAll({
      where: whereClause,
    });

    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        // Overall Rating
        const avgRating = await Rating.findOne({
          attributes: [
            [fn("AVG", col("rating")), "averageRating"],
          ],
          where: {
            storeId: store.id,
          },
          raw: true,
        });

        // Logged-in User Rating
        const userRating = await Rating.findOne({
          where: {
            storeId: store.id,
            userId: req.user.id,
          },
          raw: true,
        });

        return {
          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,

          overallRating: Number(
            avgRating?.averageRating || 0
          ).toFixed(1),

          userRating: userRating
            ? userRating.rating
            : null,
        };
      })
    );

    res.status(200).json({
      success: true,
      stores: storesWithRatings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stores",
    });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const avgRating = await Rating.findOne({
      attributes: [
        [fn("AVG", col("rating")), "averageRating"],
      ],
      where: {
        storeId: store.id,
      },
      raw: true,
    });

    res.status(200).json({
      success: true,
      store,
      averageRating: Number(
        avgRating?.averageRating || 0
      ).toFixed(1),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch store",
    });
  }
};

const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (
      !/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(
        newPassword
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 chars with one uppercase and one special character",
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    const result = await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    console.log(
      "UPDATE RESULT:",
      result
    );

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });

  } catch (error) {

    console.error(
      "PASSWORD UPDATE ERROR"
    );

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const existingRating =
      await Rating.findOne({
        where: {
          userId: req.user.id,
          storeId,
        },
      });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message:
          "You have already rated this store",
      });
    }

    await Rating.create({
      userId: req.user.id,
      storeId,
      rating,
    });

    res.status(201).json({
      success: true,
      message:
        "Rating submitted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to submit rating",
    });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;

    const { rating } = req.body;

    const existingRating =
      await Rating.findOne({
        where: {
          userId: req.user.id,
          storeId,
        },
      });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    existingRating.rating = rating;

    await existingRating.save();

    res.status(200).json({
      success: true,
      message:
        "Rating updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update rating",
    });
  }
};