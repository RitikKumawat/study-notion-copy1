const express = require("express");


const { auth, isInstructor } = require("../middlewares/auth");
const { deleteAccount, updateProfile, getAllUserDetails, instructorDashboard, updateDisplayPicture, getEnrolledCourses } = require("../controllers/Profile");
const router = express.Router();




router.delete("/deleteProfile",auth,deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getAllUserDetails)


router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router