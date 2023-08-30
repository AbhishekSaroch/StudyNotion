const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto=require("crypto")
//  reset password token (mail send )
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your E-Mail is not registered with Us",
      });
    }
    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link ${url}`
    );
    return res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong,While reseting the password",
    });
  }
};

// reset password(DB ME CHANGE)
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password donot math",
      });
    }
    const userDetails = await User.findOne({ token });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (Date.now() > userDetails.resetPasswordExpires) {
      return res.status(400).json({
        success: false,
        message: "Token Expires,Please generate your token",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Occured in reseting the password",
    });
  }
};
