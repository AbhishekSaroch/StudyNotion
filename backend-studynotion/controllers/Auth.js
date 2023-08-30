const User = require("../models/user");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// send otp to user and save in db and then compare in the signup flow

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Registered",
      });
    }
    var otp = otpGenerator.generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });
    console.log("OTP GENERATED", otp);

    // ensurint unique otp
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    //create entry
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "",
    });
  }
};

exports.signup = async (req, res) => {
    try {
      // Destructure fields from the request body
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      } = req.body;
      // Check if All Details are there or not
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !otp
      ) {
        return res.status(403).json({
          success: false,
          message: "All Fields are required",
        });
      }
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        });
      }
  
      // Find the most recent OTP for the email
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      console.log(response);
      if (response.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid ....Please Try Again",
        });
      } else if (otp !== response[0].otp) {
        // Inva	lid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid....Please recheck your otp",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      let approved = "";
      approved === "Instructor" ? (approved = false) : (approved = true);
  
      // Create the Additional Profile For User
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });
      const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType: accountType,
        approved: approved,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      });
  
      return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      });
    }
  };

exports.login = async (req, res) => {
  try {
    // get data
    // validate data
    // user check exists or not
    // generate token and check password
    // create cookie
    // return response
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All the details",
        password,
        email,
      });
    }
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "User Is Not Registered,Please signup",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        accountType: user.accountType,
        id: user._id,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In successfully",
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "Wrong Password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failed ,Please try again",
    });
  }
};

// change password

exports.changePassword = async (req, res) => {
  // data fetch
  const { oldpassword, password, newpassword } = req.body;
  // get old pass,new pass,confirn new pass
  // validation
  if (!oldpassword || !password || !newpassword) {
    return res.status(401).json({
      success: false,
      message: "Please fill all the details",
    });
  }
  // password update in db
  // send mail password updated
  // return res
};
