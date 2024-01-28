import React from 'react'
import logo from "../../assets/Images/Logo.png"
import fb from "../../assets/Images/Facebook.png"
import gogle from "../../assets/Images/Google.png"
import tweet from "../../assets/Images/Twitter.png"
import utube from "../../assets/Images/Youtube.png"

import {FooterLink2} from "../../data/footer-links"
import { Link } from 'react-router-dom'


export const Footer = () => {
  return (
            <div className='flex flex-col space-y-9 h-[45rem] w-[100vw] bg-richblack-800  '>
            <div className='flex mx-auto w-11/12 max-w-maxContent mt-10'>
                {/* left part */}
                <div className='flex flex-col items-baseline md:flex-row space-x-6 w-[45%] '>
                    <div className='flex flex-col  space-y-3 h-full'>
                        <img src={logo}></img>
                        <div className='flex flex-col space-y-2'>

                        <p className=' text-richblack-100  font-semibold'>Company</p>
                        <p className=' text-richblack-400 font-[14px] '>About</p>
                        <p className=' text-richblack-400 font-[14px]'>Careers</p>
                        <p className=' text-richblack-400 font-[14px]'>Affiliates</p>
                        </div>
                        <div className='flex space-x-3 '>
                            <img src={fb}/>
                            <img src={gogle}/>
                            <img src={tweet}/>
                            <img src={utube}/>
                        </div>
                    </div>

                    <div className='flex flex-col space-y-9'>
                        <div className='flex flex-col space-y-3'>
                        <p className=' text-richblack-100  font-semibold'>Resources</p>
                        <p className=' text-richblack-400 font-[14px] '>Articles</p>
                        <p className=' text-richblack-400 font-[14px]'>Blog</p>
                        <p className=' text-richblack-400 font-[14px]'>Chart Sheet</p>
                        <p className=' text-richblack-400 font-[14px]'>Code Challenges</p>
                        <p className=' text-richblack-400 font-[14px]'>Docs</p>
                        <p className=' text-richblack-400 font-[14px]'>Projects</p>
                        <p className=' text-richblack-400 font-[14px]'>Videos</p>
                        <p className=' text-richblack-400 font-[14px]'>Workspaces</p>
                        </div>
                        <div className='flex flex-col space-y-3'>
                        <p className=' text-richblack-100  font-semibold'>Support</p>
                        <p className=' text-richblack-400 font-[14px]'>Help Center</p>
                        </div>
                    </div>


                    <div className='flex flex-col space-y-9'>
                        <div className='flex flex-col space-y-3'>
                        <p className=' text-richblack-100  font-semibold'>Plans</p>
                        <p className=' text-richblack-400 font-[14px] '>Paid memberships</p>
                        <p className=' text-richblack-400 font-[14px]'>For Students</p>
                        <p className=' text-richblack-400 font-[14px]'>Business Solutions</p>
                        </div>
                        
                        <div className='flex flex-col space-y-3'>
                        <p className=' text-richblack-100  font-semibold'>Community</p>
                        <p className=' text-richblack-400 font-[14px]'>Forums</p>
                        <p className=' text-richblack-400 font-[14px]'>Chapters</p>
                        <p className=' text-richblack-400 font-[14px]'>Events</p>
                        </div>
                    </div>

                </div>

                {/* line */}
                <div className='w-[10%] space-x-6 flex justify-center'>
                    <div className='w-[0.3%] h-full bg-richblack-400'>

                    </div>

                </div>

                {/* right part */}
                <div className='flex flex-col sm:flex-row gap-8 sm:gap-12 w-[45%]'>
                    {
                        FooterLink2.map((element,index)=>{
                            return(
                                <div className='space-y-3 flex flex-col flex-wrap' key={index}>
                                    
                                    <p className='text-[16px] font-semibold text-richblack-50 '>{element.title}</p>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            element.links.map((link,index)=>{
                                                return(
                                                    <div key={index}
                                                    className='cursor-pointer text-[14px] transition-all duration-200 text-richblack-400 hover:text-richblack-50' >
                                                    <Link to={link.link}>{link.title}</Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                        
                                </div>
                                    
                            )
                        })
                    }
                </div>

            </div>
            {/* horizontal line */}
            <div className='mx-auto w-11/12 max-w-maxContent h-[10px]'>
                <div className='h-[1%] w-full bg-richblack-400'></div>
            </div>
            
            {/* copyright section and policy section */}
            <div className='flex mx-auto w-11/12 max-w-maxContent justify-between '>
                <div className='flex w-[70%] items-center space-x-2'>

                
                <p className=' text-richblack-300'>Privacy Policy</p>
                <div className=' bg-richblack-400 h-[15px] w-[0.1%]'></div>
                <p className=' text-richblack-300'>Cookie Policy</p>
                <div className=' bg-richblack-400 h-[15px] w-[0.1%]'></div>
                <p className=' text-richblack-300'>Terms</p>
                {/* <div className=' bg-richblack-400 h-[15px] w-[0.1%]'></div> */}
                </div>

                <div>
                    <p className='text-richblack-300'>Made with ♥ By Ritik Kumawat</p>
                </div>
            </div>
        </div>
  )
}
