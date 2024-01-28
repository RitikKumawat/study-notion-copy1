import React from 'react'
import { ContactUsForm } from '../components/core/ContactUsPage/ContactUsForm'
import { ReviewSlider } from '../components/Common/ReviewSlider'
import { Footer } from '../components/Common/Footer'
import ContactDetails from '../components/core/ContactUsPage/ContactDetails'
import ContactForm from '../components/core/ContactUsPage/ContactForm'

export const Contact = () => {
  return (
    <div>
        <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col 
        justify-between gap-10 text-white lg:flex-row'>

        <div className='lg:w-[40%]'>
          <ContactDetails/>
        </div>
        <div>
          <ContactForm/>
        </div>
        </div>
        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center
        justify-between gap-8 bg-richblack-900 text-white'>
        <h1 className='text-center text-4xl font-semibold mt-8'>Reviews from Other Learners</h1>
        <ReviewSlider/>
  
        </div>
        <Footer/>
    </div>
  )
}
