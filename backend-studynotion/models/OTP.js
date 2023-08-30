const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification E-mail from StudyNotion",
      emailTemplate(otp)
    );
    console.log("E-mail sent successfully", mailResponse.response);
  } catch (error) {
    console.log("Error Occored while sending mail", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
    console.log("New document saved to database");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
