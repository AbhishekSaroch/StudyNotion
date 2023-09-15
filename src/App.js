import React from "react";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/common/NavBar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/dashboard/MyProfile";
import Dashboard from "./pages/Dashboard"
import About from "./pages/About";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/dashboard/AddCourse";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact";
import MyCourses from "./components/core/dashboard/MyCourses";
import Catalog from "./pages/Catalog";
const App = () => {
  const {user}=useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        


<Route  element={<PrivateRoute><Dashboard /></PrivateRoute>}>
<Route path="dashboard/my-profile" element={<MyProfile />}/>
<Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}/>
{
  user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
    <>
    <Route path="dashboard/add-course" element={<AddCourse />}></Route>
    <Route path="dashboard/my-courses" element={<MyCourses />}></Route>
    </>
  )
}
</Route>


        
       
        <Route path="*" element={<Error />}/>
      </Routes>
    </div>
  );
};

export default App;
