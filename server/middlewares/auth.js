const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require('../models/User');


//auth
exports.auth = async (req,res,next)=>{
    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        //if token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }
        //Verify the token
        try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Error Occurred while validating token"
        })
    }
}

//student

exports.isStudent = async (req,res,next) =>{
    try {
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.accountType !== "Student"){
            return res.status(501).json({
                success:false,
                message:"This is a protected route for student only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cant be verified,"
        })
    }
};

//instructor
exports.isInstructor = async(req,res,next) =>{
    try {
        const userDetails = await User.findOne({email:req.user.email})
        if(userDetails.accountType !== "Instructor"){
            return res.status(501).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cant be verified,"
        })
    }
};

//isAdmin
exports.isAdmin = async(req,res,next) =>{
    try {
        const userDetails = await User.findOne({email:req.user.email})
        if(userDetails.accountType !== "Admin"){
            return res.status(501).json({
                success:false,
                message:"This is a protected route for Admin only"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cant be verified,"
        })
    }
};