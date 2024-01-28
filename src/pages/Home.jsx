import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import { HighlightText } from '../components/core/HomePage/HighlightText'
import { CTAButton } from '../components/core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks'

import { Footer } from '../components/Common/Footer'
import { TimelineSection } from '../components/core/HomePage/TimelineSection'
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection'
import { InstructorSection } from '../components/core/HomePage/InstructorSection'
import { ExploreMore } from '../components/core/HomePage/ExploreMore'
import { ReviewSlider } from '../components/Common/ReviewSlider'
const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className=' relative z-10 mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
            <Link to={"/signup"}>
                <div className='  group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className=' flex flex-row items-center gap-2 rounded-full px-10 py-[5px] 
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>  
            </div>
            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8 '>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>

            </div>

            <div className='shadow-blue-200 mx-3 my-12 shadow-[10px_-5px_50px_-5px] '>
                <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>
            {/* code section 1 */}
            

            
                <div>
                    <CodeBlocks
                        position={"lg:flex-row flex-col "}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your <HighlightText text={"Coding Potential "}/>
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                        }
                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html> \n <html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                        codeColor={"text-[#E7BC5B]"} 
                        backgroundGradient={<div className='codeblock1 absolute'></div>}
                    />
                </div>
            
            {/* code section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse flex-col"}
                    heading={
                        <div className='text-4xl font-semibold w-[100%] lg:w-[50%]'>
                            Start <HighlightText text={"Coding in seconds "}/>
                            
                        </div>
                    }
                    subheading={
                         "Go ahead, give it a try. Our hands-on learning environment means you''ll be writting real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html> \n <html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-[#D43D63]"} 
                    backgroundGradient={<div className='codeblock2 absolute'></div>}
                />
            </div>

            <ExploreMore/>
        </div>
        
        
        
        
        {/* Section 2 */}
        <div className=' bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[320px]'>
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                    <div className='lg:h-[150px]'></div>
                    <div className='flex gap-7 text-white lg:mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8'>
                    <div className='"mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                        <div className='text-4xl font-semibold lg:w-[45%]'>
                            Get the Skills you need for a <HighlightText text={"Job that is in demand"}/>
                        </div>
                    

                        <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection/>
                
                    <LearningLanguageSection/>

            </div>
            
            

        </div>
                                
        
        
        {/* Section 3 */}
        
        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                <InstructorSection/>
                <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from Other Learners</h2>
                {/* Review Slider */}
                <ReviewSlider/>
        </div>
        
        
        {/* Footer */}
        <div className="w-full bg-[#161D29] py-14">
            <Footer/>
        </div>

    </div>
  )
}

export default Home