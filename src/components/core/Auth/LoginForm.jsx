import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { CTAButton } from '../HomePage/CTAButton';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';



function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email:"",password:""
    })
    const [accountType,setAccountType] = useState("student");
    const [showPassword, setShowPassword] = useState(false);

    const {email,password} = formData
    function changeHandler(event){
        setFormData((prevData)=>(
            {

                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }
    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password,navigate))
    }
    return (
    <div>
         <div 
        className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max '>
            <button onClick={()=> setAccountType("student")}
            className={`${accountType === "student"?
            " bg-richblack-900 text-richblack-5"
            : " bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>
                Student
            </button>

            <button 
             className={`${accountType === "instructor"?
            " bg-richblack-900 text-richblack-5"
            : " bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} 
             onClick={()=>setAccountType("instructor")}>
                Instructor
            </button>
        </div>
    
    <form onSubmit={submitHandler} 
    className='flex flex-col w-full gap-y-4 mt-6 '>
        <label className='w-full '>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className=' text-pink-500'>*</sup>
            </p>
            <input
                required
                type='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter Email Address'
                name='email'
                className=' bg-richblack-800 rounded-[0.5rem] text-richblack-200 w-full p-[12px]'
            />
        </label>
        
        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className=' text-pink-500'>*</sup>
            </p>
            <input
                required
                type={showPassword ? ("text"):("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
                className=' bg-richblack-800 rounded-[0.5rem] text-richblack-200 w-full p-[12px]'
            />
            <span onClick={()=>{
                setShowPassword((prev)=>!prev)
            }} className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
            </span>
            <Link to="/forgot-password">
                <p className='text-xs mt-1 text-blue-400 max-w-max ml-auto '>Forgot Password</p>
            </Link>
        </label>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Sign In
        </button>
    </form>
    </div>
  )
}

export default LoginForm