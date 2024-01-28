const User = require('../models/User');
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const Profile = require("../models/Profile");
require("dotenv").config();
//sendOtp verification
exports.sendOTP = async (req,res) => {
    try {
        //fetch email from request body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email});

        //if user already exists then return response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already exists",
            })
        }
        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: ",otp);
        //check if otp unique or not 
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }

        //creating entry in database
        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//signup
exports.signUp = async (req,res)=>{

    try {
        //data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        //validate it 
        if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        // match passwords (password and confirm password)
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match, please check it..."
            });
        }
        //check user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
        //find most recent otp stored for the user 
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP: ",recentOtp);
        //validate otp 
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTp"
            })
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //create entry in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`, 
        })

        //return response
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can't be registered. Please try again",
        })
    }
    

} 

//login
exports.login = async (req,res)=>{
    try {
        //fetch data
        const {email,password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again"
            })
        }
        
        //check if user is registered or not 
        const user = await User.findOne({email}).populate("additionalDetails"); //here populate method is used to show additional details which is referenced by id
        
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first"
            })
        }

        //generate JWT token but match password first
        const match = await bcrypt.compare(password,user.password);
        if(match){
            const payload = {
                email: user.email ,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and return response
            const options ={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",

            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again",
        })
    }
    
};

//change password
exports.changePassword = async (req,res) =>{
    try {
        //get data from user
    const {email} = req.body;
    const user = User.findOne({email});
    
    if(!user){
        return res.status(500).json({
            success:false,
            message:"Email not valid, please enter a valid email"
        })
    }

    //get oldpassword, newPassword, confirm newpassword
    const {oldPassword,newPassword,confirmPassword} = req.body;
    //validation
    if(oldPassword !== user.password){
        return res.status(400).json({
            success:false,
            message:"Password is not correct please enter current password",
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(500).json({
            success:false,
            message:"Passwords do not match ",
        })
    }
    //update password in DB after hashing
    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    await user.save();

    //send mail - password updated
    await mailSender(email,"Password Updated","password changed");
    //return response
    return res.status(300).json({
        success:true,
        message:"Password changed",
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
};