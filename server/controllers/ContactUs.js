const mailSender = require("../utils/mailSender");
const {contactUsMail} = require("../mail/templates/contactForm");

exports.contactUs = async (req,res)=>{
    try {
        //get data
    const{firstName,lastName,email,contactNo,message,countrycode} = req.body;

    if(!firstName || !email || !contactNo || !message || !countrycode){
        return res.status(400).json({
            success:false,
            message:"Enter all the fields",
        })
    }
    const emailResponse = await mailSender(email,"we have received your message",contactUsEmail(email, firstName, lastName, message, contactNo, countrycode))
    console.log(emailResponse);
    return res.json({
        success:true,
        message:"Email sent successfully",
    })
    } catch (error) {
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
        success: false,
        message: "Something went wrong...",
        })
    }
    
};