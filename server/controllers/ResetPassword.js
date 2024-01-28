
const User =require("../models/User");
const mailSender  = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//reset password token
exports.resetPasswordToken = async (req,res) =>{
    try {
        //get email from req body 
        const {email} = req.body;

        //check user for this mail, email validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Enter a valid email which is registered"
            })
        }
        //generate token
        const token = crypto.randomUUID(); 

        //Update user by adding token and expiration time 
        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                        {
                                                            token:token,
                                                            resetPasswordExpires:Date.now() + 5*60*1000,
                                                        },
                                                        {new:true});
        //crete url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailSender(email,"Password reset link",`Password reset link: ${url}`);

        //return response
        return res.json({
            success:true,
            message:"Email sent successfully, please check your mail and reset the password"
        })
    } catch (error) {
        console.log(error);
       return res.json({
        success:false,
        message:"Something went wrong while sending reset password link"
       }) 
    }


};



//reset password 
exports.resetPassword = async (req,res)=>{
    try {
        //data fetch
        const {password,confirmPassword,token} = req.body;
        //validation
        if(password!== confirmPassword){
            return res.json({
                success:false,
                message:"Passwords do not match"
            })
        }
        //get user details from db using token
        const userDetails=  await User.findOne({token:token});
        //if no entry - invalid token or token time expired
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        if( userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate your token"
            })
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //update the password
        await User.findOneAndUpdate({token:token},
            {password:hashedPassword},
            {new:true},);
        //return response
        return res.json({
            success:true,
            message:"Password reset successfully"
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"Error occured while reseting password, try again"
        })
    }
};
