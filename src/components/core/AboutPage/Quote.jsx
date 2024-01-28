import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

export const Quote = () => {
  return (
    <div className='text-richblack-100 font-semibold text-3xl text-center p-8'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"}/>
        ,
        <span className=' text-[#FF512F]'>
            {" "}
            expertise
        </span>
        , and community to create an 
        <span className='text-[#FF512F]'>
            {" "}
            unparalleled educational experience.
        </span>
    </div>
  )
}
