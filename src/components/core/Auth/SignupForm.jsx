import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../Common/Tab"
import { CTAButton } from "../HomePage/CTAButton"

function SignUpForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showCreatePassword, setCreatePassword] = useState(false)
  const [showConfirmPassword, setConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]
    return (
    <div className='  '>
        {/* student-instructor tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        <form onSubmit={handleOnSubmit} >
            {/* firstname and lastname */}
            <div className='w-full flex gap-x-4 mt-[20px]'>

                <label className='w-full '>
                    <p className='text-[0.875rem] text-richblack-100 mb-1 leading-[1.375rem]'>
                     First Name<sup  className=' text-pink-500'>*</sup></p>
                    <input 
                        required
                        type='text'
                        name='firstName'
                        onChange={changeHandler}
                        placeholder='Enter First Name'
                        value={firstName}
                        className=' bg-richblack-800 rounded-[0.5rem] text-richblack-200 w-full p-[12px]'

                    />
                </label>
            
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-100 mb-1 leading-[1.375rem]'>
                        Last Name<sup  className=' text-pink-500'>*</sup></p>
                    <input 
                        required
                        type='text'
                        name='lastName'
                        onChange={changeHandler}
                        placeholder='Enter Last Name'
                        value={lastName}
                        className=' bg-richblack-800 text-richblack-200 rounded-[0.5rem]  w-full p-[12px]'

                    />
                </label>
            
            </div>
            {/* email */}
            <div className='mt-[20px]'>
            <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-richblack-100 mb-1 leading-[1.375rem]'>
                        Email Address<sup  className=' text-pink-500'>*</sup></p>
                    <input 
                        required
                        type='email'
                        name='email'
                        onChange={changeHandler}
                        placeholder='Enter Email Address'
                        value={email}
                        className=' bg-richblack-800 text-richblack-200 rounded-[0.5rem]  w-full p-[12px]'

                    />
            </label>
            </div>
            

            {/* createPassword and Confirm Password  */}
            <div className='w-full flex gap-x-4 mt-[20px]'>
            <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richblack-100 mb-1 leading-[1.375rem]'>
                        Create Password<sup  className=' text-pink-500'>*</sup></p>
                    <input 
                        required
                        type={showCreatePassword ? ("text"):("password")}
                        name='password'
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        value={password}
                        className=' bg-richblack-800 text-richblack-200 rounded-[0.5rem]  w-full p-[12px]'

                    />
                    <span className='absolute right-3 top-[38px] cursor-pointer'
                     onClick={()=>{
                        setCreatePassword((prev)=>!prev)
                         }}>
                        {showCreatePassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
            </label>

            <label className='relative w-full'>
                    <p className='text-[0.875rem] text-richblack-100 mb-1 leading-[1.375rem]'>
                        Confirm Password<sup  className=' text-pink-500'>*</sup></p>
                    <input 
                        required
                        type={showConfirmPassword ? ("text"):("password")}
                        name='confirmPassword'
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        className=' bg-richblack-800 text-richblack-200 rounded-[0.5rem]  w-full p-[12px]'

                    />
                    <span className='absolute right-3 top-[38px] cursor-pointer'
                     onClick={()=>{
                        setConfirmPassword((prev)=>!prev)
                         }}>
                        {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
            </label>
            </div>
            <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
        </form>
    </div>
  )
}

export default SignUpForm