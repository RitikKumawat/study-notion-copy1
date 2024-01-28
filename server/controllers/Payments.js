const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const {  default:mongoose } = require("mongoose");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async(req,res) =>{

    const { courses } = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({success:false, message:"Please provide course Id"})
    }
    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success:true, message:"Could not find course"})
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.json({
                    success:false,
                    message:"Student is already enrolled"
                })
            }
            totalAmount+=course.price;

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    const options = {
        amount:totalAmount*100,
        currency:'INR',
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse  = await instance.orders.create(options);
        console.log("Payment Response backend payment controller",paymentResponse)
        return res.json({
            success:true,
            data:paymentResponse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not initiate order",
        })
    }
}

// verify the payment
exports.verifyPayment = async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    console.log("order id..",razorpay_order_id);
    console.log("payment id..",razorpay_payment_id);
    console.log("signature..",razorpay_signature);
    console.log("courses..",courses);
    console.log("userid..",userId);
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId ){
        return res.status(200).json({
            success:false,
            message:"Payment failed"
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256",'hv8FMSQfUbknaWHzD86jGrfE')
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){
        //enroll the student 
        const data = await enrollStudents(courses,userId,res);

        //return res
        console.log("Printing data enrolled student,,,,",data);
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        });
    }
    return res.status(200).json({
        success:false,
        message:data,
    })

}





exports.sendPaymentSuccessEmail = async(req,res)=>{
    const {orderId,paymentId,amount} = req.body;
    const userId = req.user.id;
    
    if(!orderId || !paymentId || !amount || !userId ){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        })
    }
    try {
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
            amount/100,orderId,paymentId)
        )
        console.log("Enrolled student.....",enrolledStudent)
    } catch (error) {
        console.log("error in sending mail....",error);
        return res.status(500).json({
            success:false,
            message:"could not send mail"
        })
    }
}

const enrollStudents = async(courses,userId,res)=>{
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide data for courses Sor userID"
        })
    }
    for(const courseId of courses){

       try {
                const enrolledCourse = await Course.findOneAndUpdate(
                        {_id:courseId},
                        {$push:{studentsEnrolled:userId}},
                        {new:true},
                )

                if(!enrolledCourse){
                        return res.status(500).json({
                            success:false,
                            message:"Course not found"
                        })       
                }
                const courseProgress = await CourseProgress.create({
                    courseID:courseId,
                    userId:userId,
                    completedVideos:[],
                })
                console.log("Updated Course... backend controller payment",enrolledCourse);
                // find the student and add the course to their list of enrolled courses
                const enrolledStudent  = await User.findByIdAndUpdate(userId,
                    {$push:{
                        courses:courseId,
                        courseProgress:courseProgress._id,
                    }},{new:true})

                //send mail
                console.log("enrolled student backend controller",enrolledStudent);
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    `Successfully enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
                )
                console.log("Email sent successfully",emailResponse);
            } catch (error) {
                console.log("Printing error.....",error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })        
            }
    }
}




// It is only for single item
//capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req,res) =>{
//     try {
//         //get userid and courseid
//         const {courseId} = req.body;
//         const userId = req.user.id;
//         // validation
//         //valid course id 
//         if(!courseId){
//             return res.json({
//                 success:false,
//                 message:"Please provide valid course id",
//             })
//         }
//         //valid course detail
//         let course;
//         try {
//             course = await Course.findById(courseId);
//             if(!course){
//                 return res.json({
//                     success:false,
//                     message:"Could not find the course",
//                 })
//             }
//             //user already paid for the same course
//             const uid = new mongoose.Types.ObjectId(userId); //converting userId which is in stiring format to objectID
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"student is already enrolled in the course"
//                 })
//             }
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }

//         //now create order
//         const amount = (course.price);
//         const currency = "INR";

//         const options = {
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId,
//             }
//         }
//         try {
//            //initiate the payment using razorpay
//            const paymentRespnse = await instance.orders.create(options);
//            console.log(paymentRespnse); 
//            //return response
//            return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId: paymentRespnse.id,
//                 currency:paymentRespnse.currency,
//                 amount:paymentRespnse.amount,
//            })
//         } catch (error) {
//             return res.json({
//                 success:false,
//                 message:"Cannot initiate payment",
//             })
//         }
        
//     } catch (error) {
//         return res.json({
//             success:false,
//             message:"Something went wrong in creating Razorpay order"
//         })
//     }
// };

//verify signature of Razorpay and server
// exports.verifySignature = async (req,res)=>{
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256",webhookSecret); //sha256 is hashing algorithm
//     shasum.update(JSON.stringify(req.body)); //converting object to string
//     //when you run hashing algorithm on a text then the output is known as Digest
//     //Digest is generally in hexadecimal form
//     const digest = shasum.digest('hex');

//     //match signature and digest
//     if(signature === digest){
//         console.log("Payment is authorized");
//         //fetching course and user ID from notes in payment response
//         const{courseId,userId} = req.body.payload.payment.entity.notes;
//         try {
//             //find the course and enroll the student in the corresponding course
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentsEnrolled:userId}},
//                 {new:true},
//             )
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"course not found",
//                 })
//             }
//             console.log(enrolledCourse);
//             //find the student and update enrolled course
//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id:userId},
//                 {$push:{courses:courseId}},
//                 {new:true},
//             )
//             console.log(enrolledStudent);

//             //send confirmation mail
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,"Congratulations, from Codehelp",
//                 "Congratulations, you are onboarded into new Codehelp Course"); 
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Student is successfully enrolled",
//             })
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             })
//         }

//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request",
//         })
//     }
// };