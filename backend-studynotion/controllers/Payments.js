const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { Mongoose, default: mongoose } = require("mongoose");

exports.capturePayment = async (req, res) => {
  // get user and courseId
  // validation
  // valid course detail
  // user already pay for same course
  // order create
  // return
  const { course_id } = req.body;
  const userid = req.user.id;

  if (!course_id) {
    return res.status.json({
      success: false,
      message: "Please Provide Valid Course ID  ",
    });
  }
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "Could NOT Find the course",
      });
    }
    const uid = new mongoose.Types.ObjectId(userid);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student Already Enrolled",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  const amount = course.price;

  const currency = INR;
  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userid,
    },
  };
  try {
    // initiate the payment using the razorpay
    // creating the order
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    console.error(error);
    return res.status(200).json({
      success: true,
      courseName: couse.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate the Payment",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const webHookSecret = "123456789";

    const signature = req.headers["x-razorpay-signature"];

    const shamsun = crypto.createHmac("sha256", webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("Hex");

    if (signature == digest) {
      console.log("payment authorised");
      const {userId,courseid}=req.body.payload.payment.entity.notes;
      try {
        const enrolledCourse=await Course.findOneAndUpdate({_id:courseid},
            {
                $push:{
                    studentsEnrolled:{userId}
                },
            }, {new:true})
            if(!enrolledCourse){
                return res.status(401).json({
                    success:false,
                    message:"Course Not found"
                })
            }
            const enrolledStudent=await User.findOneAndUpdate({_id:userId},{
                $push:{
                    courses:courseid
                }
            });
            console.log(enrolledStudent)

            // mail send confirmation
            const emailResponse=await mailSender(
                enrolledStudent.email,
                "Congratulations-From StudyNotion",
                "Congratulations You Are onboarded into New StudyNotion Course"
            )
            console.log(emailResponse)
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added"
            })
      } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })
      }
    }
  } catch (error) {
    return res.status(500).json({
        success:false,
            message:error.message,
    })
  }
};
