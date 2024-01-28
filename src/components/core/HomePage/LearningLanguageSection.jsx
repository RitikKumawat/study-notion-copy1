import React from 'react'
import { HighlightText } from './HighlightText'
import knowProgress from "../../../assets/Images/know_progress.png"
import compareOthers from "../../../assets/Images/compare_others.png"
import planLesson from "../../../assets/Images/plan_lesson.png"
import { CTAButton } from './CTAButton'
export const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col  gap-5 items-center'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={"Learning any language"}/>
        </div>
        <div className='text-center text-richblack-600 font-medium w-[70%] mx-auto text-base mt-3'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        
        <div className='flex lg:flex-row flex-col items-center justify-center lg:gap-0 gap-0 mt-5'>
            <img
              src={knowProgress}
              alt='KnowYourProgress'
              className=' object-contain lg:-mr-32 -mb-12'
            />
            <img
              src={compareOthers}
              alt='compareOthers'
              className=' object-contain'
            />
            <img
              src={planLesson}
              alt='planLesson'
              className=' object-contain lg:-ml-36 -mt-16'
            />

        </div>
        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>
              Learn more
            </div>
          </CTAButton>
        </div>

        
      </div>
    </div>
  )
}
