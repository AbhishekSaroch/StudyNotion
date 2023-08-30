import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { sendOtp,signUp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
const VerifyEmail = () => {
  const { loading,signupData } = useSelector((state) => state.auth);

  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!signupData){
        navigate("/signup")
        console.log(" no signup data is there")
    }
  })
  const handleonsubmit = (e) => {
    e.preventDefault(signUp());
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="text-white">
      {loading ? (
        <div>Loading .....</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification email has been sent to you .Enter the code below</p>
          <form onSubmit={handleonsubmit}>
            <OTPInput
              value={otp}
              onChange={setOTP}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
            <button type="submit">Verify Email</button>
          </form>
          <div>
            <div>
              <Link to={"/login"}>
                <p>Back To Login Page</p>
              </Link>
            </div>

            <button onClick={()=>dispatch(sendOtp(signupData.email))}>Resend It</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
