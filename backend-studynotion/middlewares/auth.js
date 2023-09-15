const jwt=require("jsonwebtoken")
const User=require("../models/user");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try {
        const token =
        req.cookies.token ||
        req.body.token ||
        req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Is Missing"
            })
        }
        try {
            const decode= jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user=decode
        } catch (error) {
            console.log("Error From Auuth",error)
            return res.status(401).json({
                success:false,

                message:"Ye chal rha hai bro !!!!!!",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}
exports.isStudent=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"Protected routes for Students only !!"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}
exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"Protected routes for Instructor only !!"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"Protected routes for Admins only !!"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}
