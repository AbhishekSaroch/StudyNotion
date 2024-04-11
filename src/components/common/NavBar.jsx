import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import {useLocation,matchPath} from "react-router-dom" 
import {useSelector} from "react-redux"
import ProfileDropDown from "../core/auth/ProfileDropDown";
const NavBar = () => {
  const location=useLocation();
  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname)
  }
  const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)
  const {totalItems}=useSelector((state)=>state.cart)
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center  justify-between">
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li>
                {link.title == "Catalog" ? (
                  <div></div>
                ) : (
                  <Link to={link?.path}><p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link?.title}</p></Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* login signup */}
        <div className="flex gap-x-5 items-center">
        {
              token==null &&(
                <Link to={"/signup"}>
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">Signup</button>
                </Link>
              )
            }
            {
              token==null &&(
                <Link to={"/login"}>
                  <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">Login</button>
                </Link>
              )
            }
            {
              token!=null && (
                <ProfileDropDown />
              )
            }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
