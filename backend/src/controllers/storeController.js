const { Store, Rating, User } = require("../models");
const { fn, col } = require("sequelize");


exports.getDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const totalRatings = await Rating.count({
      where: {
        storeId: store.id,
      },
    });

    const averageRating = await Rating.findOne({
      attributes: [
        [fn("AVG", col("rating")), "avgRating"],
      ],
      where: {
        storeId: store.id,
      },
      raw: true,
    });

    const ratings = await Rating.findAll({
      where: {
        storeId: store.id,
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
          ],
        },
      ],
    });

    const ratedUsers = ratings.map((item) => ({
      userId: item.User.id,
      userName: item.User.name,
      userEmail: item.User.email,
      rating: item.rating,
    }));

    res.status(200).json({
      success: true,
      storeName: store.name,
      totalRatings,
      averageRating:
        Number(
          averageRating.avgRating || 0
        ).toFixed(1),
      ratings: ratedUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard",
    });
  }
};