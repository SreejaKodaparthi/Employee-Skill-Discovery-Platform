const Recommendation = require("../models/LearningRecommendation");

const getRecommendation = async (req, res) => {
  try {

    const {
      employeeId,
      roleId
    } = req.params;

    // --- Restrict employees to their own data ---
    if (
      req.user.role === "employee" &&
      req.user._id.toString() !== employeeId
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this recommendation.",
      });
    }
    
    const recommendation =
      await Recommendation.findOne({
        employeeId,
        roleId,
      });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message:
          "No recommendation found. Generate Skill Gap Report first.",
      });
    }

    res.status(200).json({
      success: true,
      cached: true,
      recommendation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getRecommendation,
};
