import React from 'react'
import { useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useEffect } from 'react';

export const VerifyEmail = () => {
    const [otp,setOtp] = useState("");
    const {loading} = useSelector((state)=>state.auth);

    const {signupData} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect( () => {
    //     if(!signupData){
    //         navigate("/signup");

    //     }
    // },[]); 
    const submitHandler = (e) =>{
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            
        } = signupData ;
        
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate));
    }
    

    return (
        <div className='text-richblack-100'>
        {
            loading ? (<div>
            Loading....</div>) 
            :(
            
                <div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below </p>
                    <form onSubmit={submitHandler}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={ (props)=> <input{...props} placeholder='-'/>}

                        />
                        <button type='submit'>
                            Verify Email
                        </button>
                    </form>
                    <div>
                        <div>
                            <Link to="/login">
                            <p> Back to Login</p>
                            </Link>
                        </div>
                        <button onClick={ () => dispatch(sendOtp(signupData.email,navigate))}>
                            Resend it
                        </button>
                    </div>
                </div>

            )
        }       
        </div>
    )
        
}
