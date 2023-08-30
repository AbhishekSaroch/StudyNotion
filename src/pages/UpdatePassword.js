import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import{ AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
const UpdatePassword = () => {
  
  const dispatch = useDispatch();
  const location =useLocation()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);

  const handleonchange = (e) => {
    // update the form data
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleonsubmit = (e) => {
    e.preventDefault();
    const token=location.pathname.split("/").at(-1);
    dispatch(resetPassword(password,confirmPassword,token));
  };
  return (
    <div className="text-white">
      {loading ? (
        <div>Loading .....</div>
      ) : (
        <div>
          <h1>Choose New Password</h1>
          <p>Almost Done , Please Try Again</p>
          <form onSubmit={handleonsubmit}>
            <label>
              <p>
                New Password <sup>*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleonchange}
                placeholder="Password"
                className="w-full p-6 bg-richblack-600 text-richblack-5"
              />
              <span
              onClick={()=>setShowPassword((prev)=>!prev)}
              >{
                showPassword ? (<AiFillEye fontSize={24}/>) : (<AiFillEyeInvisible  fontSize={24}/>)
            }</span>
            </label>

            <label>
              <p>
                Confirm New Password <sup>*</sup>
              </p>
              <input
                required
                type={showconfirmpassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleonchange}
                placeholder="Confirm Password"
                className="w-full p-6 bg-richblack-600 text-richblack-5"
              />
              <span
              onClick={()=>setshowconfirmpassword((prev)=>!prev)}
              >{
                showconfirmpassword ? (<AiFillEye fontSize={24}/>) : (<AiFillEyeInvisible  fontSize={24}/>)
            }</span>
            </label>
            <button type="submit">Reset Password</button>
          </form>
          <div>
          <Link to={"/login"}><p>Back To Login Page</p></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
