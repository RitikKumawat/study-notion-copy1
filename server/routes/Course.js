const express = require("express");
const { createCategory, showAllCategories, categoryDetails, categoryPageDetails } = require("../controllers/category");
const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth");
const { createRating, getAverageRating, getAllRating, getAllRatingReview } = require("../controllers/RatingAndReview");
const { createCourse, editCourse, showAllCourses, getInstructorCourses, getCourseDetails, getFullCourseDetails, deleteCourse, getAllCourse, getAllCourses } = require("../controllers/Course");
const { updateSection, deleteSection, createSection } = require("../controllers/Section");
const { updateSubSection, deleteSubSection, createSubSection } = require("../controllers/SubSection");
const { updateCourseProgress } = require("../controllers/CourseProgress");
const router = express.Router();



router.post("/createCourse",auth,isInstructor,createCourse)
router.post("/editCourse",auth,isInstructor,editCourse)

router.post("/addSection",auth,isInstructor,createSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)
router.post("/addSubSection",auth,isInstructor,createSubSection)

router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)

router.get("/getAllCourses",getAllCourses)
router.post("/getCourseDetails",getCourseDetails)

router.post("/getFullCourseDetails",auth,getFullCourseDetails)

router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)

router.delete("/deleteCourse",deleteCourse)





router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories)
router.post("/getCategoryPageDetails",categoryPageDetails)



router.post("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingReview)

module.exports = router;