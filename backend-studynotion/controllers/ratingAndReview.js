const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// create rating

exports.createRating = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const { userId } = req.body.user;
    if (!rating || !review) {
      return res.status(401).json({
        success: false,
        message: "Please Fill All the details",
      });
    }
    if (!courseId) {
      return res.status(401).json({
        success: false,
        message: "Please Fill All the details",
      });
    }
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "First Enroll in the course ,Then Review",
      });
    }
    const alreadyReviewed = await RatingAndReview.findOne({
      use: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(401).json({
        success: false,
        message: "User Already reviewd the course",
      });
    }
    // create rating and review
    const newratingAndReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: newratingAndReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourse);

    return res.status(200).json({
      success: true,
      message: "Rating And Review Successfully ,Created",
      newratingAndReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured While Creating The Course",
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body.courseId;
    const res = await RatingAndReview.aggregate();
  } catch (error) {}
};
exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });
    return res.status(200).json({
      success: true,
      message: "Successfully Fetched All The Reviews",
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      success: false,
      message: "Not Be Able to Find All the courses",
    });
  }
};
