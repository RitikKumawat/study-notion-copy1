const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email,title,body) =>{
    try {
       let transporter =  nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:true,
       }) 

       let info  = await transporter.sendMail({
            from:'StudyNotion',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
       })
       console.log(info.response);
       return info;

    } catch (error) {
        console.log("Something went wrong in email sending mailSender")
        console.log(error.message);
    }
}

module.exports = mailSender;