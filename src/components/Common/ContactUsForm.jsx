import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiconnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"


export const ContactUsForm = () => {
    const[loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data)=>{
        console.log("Logging Data", data);
        try {
            setLoading(true);
            const response= await apiconnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("Logging response",response);
            setLoading(false);
        } catch (error) {
            console.log("Error:",error.message);
            setLoading(false);
        }
    }
    
    useEffect( ()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful])
    return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-12'>
            <div className='flex flex-row gap-5 justify-between '>
                {/* firstname */}
                <div className='flex flex-col gap-3 w-[50%]'>
                    <label htmlFor='firstname' className=' font-normal text-sm text-richblack-5'>First Name</label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter First Name'
                        className='text-richblack-300 bg-richblack-800 p-3 rounded-md'
                        {...register("firstname",{required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please Enter Your Name
                            </span>
                        )
                    }
                    
                </div>
                {/* lastname */}
                <div className='flex flex-col gap-3 w-[50%]'>
                    <label htmlFor='firstname' className='font-normal text-sm text-richblack-5'>Last Name</label>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter Last Name'
                        className='text-richblack-300 bg-richblack-800 p-3 rounded-md'
                        {...register("lastname")}
                    />
                </div>
            </div>        
                {/* email */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor='email' className='font-normal text-sm text-richblack-5'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email address'
                        className='text-richblack-300 bg-richblack-800 p-3 rounded-md'
                        {...register("email",{required:true})}
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your email
                            </span>
                        )
                    }
                </div>
                
                {/* phone no */}
                <div className='flex flex-col gap-3 '>
                    <label htmlFor='phonenumber' className='font-normal text-sm text-richblack-5' >Phone Number</label>
                    <div className='flex flex-row   '>
                        {/* dropdown */}
                        <div className='w-[20%]'>
                            <select
                            name='dropdown'
                            id='dropdown'
                            {...register("countrycode",{required:true})}
                            className='text-richblack-300 bg-richblack-800 p-3 rounded-md w-[80%]'>
                                {
                                    CountryCode.map( (element,index)=>{
                                        return (
                                            <option key={index} value={element.code} className='text-richblack-300'>
                                                {element.code} - { element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>


                        <div className='w-[85%]'>
                            <input
                                type='number'
                                name='phonenumber'
                                id='phonenumber'
                                placeholder='12345 6789'
                                className='text-richblack-300 bg-richblack-800 p-3 rounded-md w-[100%] '
                                {...register("phoneNo",
                                {required:{value:true,message:"Please Enter Phone Number"},
                                maxLength:{value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                            />

                            
                        </div>

                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }

                </div>


                {/* message */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor='message' className='font-normal text-sm text-richblack-5'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                        placeholder='Enter Your message here'
                        className='text-richblack-300 bg-richblack-800 p-3 rounded-md'
                        {...register("message",{required:true})}
                    />
                    {
                        errors.message && (
                            <span>Please Enter Your Message</span>
                        )
                    }
                </div>

                <button type='submit'
                className='rounded-md bg-yellow-50 text-center p-3 text-[16px] font-medium text-richblack-900'>
                    Send Message
                </button>

                    
            
        </div>


    </form>
  )
}
