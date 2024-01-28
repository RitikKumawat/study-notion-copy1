import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

export const ForgotPassword = () => {

    const [emailSent,setEmailSend] = useState(false);
    const [email,setEmail] = useState("");
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSend))
    }

    const changeHandler = (e) =>{
        setEmail(e.target.value);
    }
  return (
    <div className='text-richblack-100 flex justify-center items-center'>
        {
            loading ? (
                <div>Loading......</div>
            ): (
                <div>
                    <h1>
                        {
                            !emailSent ? "Reset your password" : "Check your Email"
                        }
                    </h1>
                    <p>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                             `We have sent the reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address</p>
                                    <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={changeHandler}
                                        placeholder='Enter Your Email Address'
                                    />
                                </label>
                            )
                        }
                        <button type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    <div>
                        <Link to="/login">
                            Back to login
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}
