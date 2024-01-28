const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();
exports.updateProfile = async (req,res) =>{
    try {
        //get data
        const {firstName="",lastName="",dateOfBirth="",about="",contactNumber="",gender=""} = req.body;

        //get user id
        const id = req.user.id;
        
        //find profile
        const userDetails = await User.findById({_id:id});
        const profile = await Profile.findOne(userDetails?.additionalDetails._id);
        console.log("Printing user Details/////////",userDetails.additionalDetails);
        console.log("Printing Additional Details/////////",profile);
        const user = await User.findByIdAndUpdate(id,{firstName, lastName, });
        // console.log(user.additionalDetails);
        await user.save()
        // update profile
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;
        
        await profile.save();
        //return response

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

        return res.status(300).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        })
    } catch (error) {
      console.log("Something happened ",error);  
      return res.status(500).json({
            success:false,
            error:error.message,
            message:"Something went wroonnnnnggg......"
        })
    }
}

//delete Account
exports.deleteAccount = async (req,res)=>{
    try {
       //get user id
       const userId = req.user.id;

       //check valid id or not 
       console.log(userId);
       const user  = await User.findById(userId);
      //  console.log(userDetails);
       if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
       }
       //delete profile
       await Profile.findByIdAndDelete({_id:user.additionalDetails});
       //Un enroll user from all enrolled courses
      //  await Course.findByIdAndDelete({_id:user.courses});
       
       //delete user
       await User.findByIdAndDelete({_id:userId});

      //  await CourseProgress.deleteMany(userId);
       //return response 
       return res.status(200).json({
            success:true,
            message:"Account Deleted "
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something happened",
            error:error.message,
        })
    }
}


exports.getAllUserDetails = async (req,res) =>{
    try {
        //get id 
        const userId = req.user.id;
        //validate and get user details
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Cant get user details, please check if it is a valid user"
            })
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}


exports.updateDisplayPicture = async(req,res) =>{
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,process.env.FOLDER_NAME,
            1000,
            70
        )
        console.log(image);
        const updateProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true},
        )
        res.send({
            success:true,
            message:"Image updated successfully",
            data:updateProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not update profile"+error.message,
          })
    }
};

exports.getEnrolledCourses = async (req,res)=>{
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({
            _id:userId,
        }).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                },
            },
        })
        .exec()
        userDetails = userDetails.toObject();
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
    } catch (error) {
      console.log("error message .....",error);  
      return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}



exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }