import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import { logout } from "./authAPI";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints 

export function getUserDetails(token,navigate){
    return async (dispatch)=>{
        const toastID = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiconnector("GET",GET_USER_DETAILS_API,null,{
                Authorization: `Bearer ${token}`,
            })
            console.log("GET USER DETAILS API RESPONSE.....",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            const userImage = response.data.userDetails.image 
            ? response.data.userDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            dispatch(setUser({...response.data.data,image:userImage}))
        } catch (error) {
            // dispatch(logout(navigate))
            console.log("API ERROR GET USER DETAILS......",error)
            toast.error("COULD not get user details")
        }
        toast.dismiss(toastID)
        dispatch(setLoading(false));
    }
}


export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiconnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      // console.log(
      //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data

    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }
  
export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiconnector("GET", GET_INSTRUCTOR_DATA_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
      result = response?.data?.courses
    } catch (error) {
      console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
      toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
  }
