import React from 'react'
import Instructor from "../../../assets/Images/instructor.png"
import { HighlightText } from './HighlightText'
import { CTAButton } from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
export const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-col lg:flex-row gap-20 items-center'>
            <div className='lg:w-[50%] '>
                <img
                    src={Instructor}
                    alt='instructor'
                    className='shadow-white'
                />
            </div>
            <div className='lg:w-[50%] flex flex-col gap-10'>
                <div className='font-semibold text-4xl lg:w-[50%]'>
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className='w-fit'>

                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center '>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}
