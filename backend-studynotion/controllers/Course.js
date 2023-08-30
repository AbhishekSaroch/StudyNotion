// create course
// get all courses

const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/user");
const uploadImageToCloudinary = require("../utils/imageUploader");
require("dotenv").config();
exports.createCourse = async (req, res) => {A
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    const { thumbnail } = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !thumbnail ||
      !price ||
      !tag
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the data",
      });
    }
    // check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById({ userId });
    console.log("instructorDetails", instructorDetails);
    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    // check given tag is valid or not
    const categoryDetails = await Category.findById({ tag });

    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: "categoryDetails  not found",
      });
    }
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      Category: categoryDetails._id,
      thumbnailImage: thumbnailImage.secure_url,
    });
    // add new course to user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // update tag schema
    return res.status(200).json({
        success:true,
        message:"Course Created Successfully",
        newCourse,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:"Course Not Created ",
    })
  }
};

// get all courses
exports.getAllCourses=async(req,res)=>{
    try {
        const allCourses=await Course.find({},{courseName:true,courseDescription:true, whatYouWillLearn:true, price:true, tag:true})
    } catch (error) {
        console.log(error)
    return res.status(500).json({
        success:false,
        message:"Course Details donot fetched !!! Please try again ",
    })
    }
}

// get entire details of all courses
exports.getCourseDetails=async(req,res)=>{
  try {
    // get course id
    const {courseId}=req.body;

    const courseDetails=await Course.find({_id:courseId}).populate(
      {
        path:'instructor',
        populate:{
          path:"additionalDetails"
        }
      }
    ).populate("category")
    .populate("ratingAndReviews")
    .populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    })
    .exec();
    // validation
    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the course with ${courseId}`
      })
    }
    return res.status(200).json({
      success:true,
      message:"Course Details fetched successfully",
      data:courseDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}
