const { Rating, Store } = require("../models");

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    // Validate Store
    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    // Validate Rating
    if (
      !Number.isInteger(Number(rating)) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 1 and 5",
      });
    }

    // Check Existing Rating
    const existingRating =
      await Rating.findOne({
        where: {
          userId: req.user.id,
          storeId,
        },
      });

    // Update Existing Rating
    if (existingRating) {
      existingRating.rating = rating;

      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: "Rating updated",
        rating: existingRating,
      });
    }

    // Create New Rating
    const newRating =
      await Rating.create({
        userId: req.user.id,
        storeId,
        rating,
      });

    res.status(201).json({
      success: true,
      message: "Rating submitted",
      rating: newRating,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit rating",
    });

  }
};