const { User, Store, Rating } = require("../models");
const { fn, col, Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.status(200).json({
      success: true,
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role,
    } = req.body;

    // Name Validation
    if (
      name.length < 20 ||
      name.length > 60
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name must be between 20 and 60 characters",
      });
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Address Validation
    if (address.length > 400) {
      return res.status(400).json({
        success: false,
        message:
          "Address cannot exceed 400 characters",
      });
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters with at least one uppercase letter and one special character",
      });
    }

    const existingUser =
      await User.findOne({
        where: { email },
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

exports.createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      ownerId,
    } = req.body;

    // Name Validation
    if (
      name.length < 20 ||
      name.length > 60
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Store name must be between 20 and 60 characters",
      });
    }

    // Address Validation
    if (address.length > 400) {
      return res.status(400).json({
        success: false,
        message:
          "Address cannot exceed 400 characters",
      });
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Duplicate Store Email Check
    const existingStore =
      await Store.findOne({
        where: { email },
      });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message:
          "Store email already exists",
      });
    }

    // Owner Validation
    const owner =
      await User.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message:
          "Store owner not found",
      });
    }

    if (
      owner.role !== "STORE_OWNER"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Selected user is not a store owner",
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    res.status(201).json({
      success: true,
      message:
        "Store created successfully",
      store,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create store",
    });

  }
};

exports.getAllStores = async (
  req,
  res
) => {
  try {
    const stores =
      await Store.findAll({
        include: [
          {
            model: User,
            as: "owner",
            attributes: [
              "id",
              "name",
            ],
          },
          {
            model: Rating,
            attributes: [
              "rating",
            ],
          },
        ],
      });

    const formattedStores =
      stores.map((store) => {
        const ratings =
          store.Ratings || [];

        const averageRating =
          ratings.length > 0
            ? (
                ratings.reduce(
                  (
                    sum,
                    rating
                  ) =>
                    sum +
                    rating.rating,
                  0
                ) /
                ratings.length
              ).toFixed(1)
            : "0.0";

        return {
          id: store.id,
          name: store.name,
          email: store.email,
          address:
            store.address,
          averageRating,
          owner:
            store.owner,
        };
      });

    res.status(200).json({
      success: true,
      stores:
        formattedStores,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch stores",
    });
  }
};

exports.createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      ownerId,
    } = req.body;

    const existingStore =
      await Store.findOne({
        where: { email },
      });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "Store email already exists",
      });
    }

    const owner =
      await User.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    res.status(201).json({
      success: true,
      message:
        "Store created successfully",
      store,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create store",
    });

  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sort = "name",
      order = "ASC",
    } = req.query;

    const whereClause = {};

    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (email) {
      whereClause.email = {
        [Op.like]: `%${email}%`,
      };
    }

    if (address) {
      whereClause.address = {
        [Op.like]: `%${address}%`,
      };
    }

    if (role) {
      whereClause.role = role.toUpperCase();
    }

    const allowedSortFields = [
      "name",
      "email",
      "role",
      "createdAt",
    ];

    const sortField =
      allowedSortFields.includes(sort)
        ? sort
        : "name";

    const sortOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    const users = await User.findAll({
      where: whereClause,
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "role",
        "createdAt",
      ],
      order: [[sortField, sortOrder]],
    });

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Store,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      ratings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ratings",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "role",
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let response = user.toJSON();

    if (user.role === "STORE_OWNER") {
      const stores = await Store.findAll({
        where: {
          ownerId: user.id,
        },
        attributes: ["id"],
      });

      const storeIds = stores.map(
        (store) => store.id
      );

      let averageRating = "0.0";

      if (storeIds.length > 0) {
        const ratingData =
          await Rating.findOne({
            attributes: [
              [
                fn(
                  "AVG",
                  col("rating")
                ),
                "avgRating",
              ],
            ],
            where: {
              storeId: storeIds,
            },
            raw: true,
          });

        averageRating = Number(
          ratingData.avgRating || 0
        ).toFixed(1);
      }

      response.averageRating =
        averageRating;
    }

    res.status(200).json({
      success: true,
      user: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch user details",
    });
  }
};