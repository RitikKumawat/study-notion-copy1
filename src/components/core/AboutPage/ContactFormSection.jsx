import React from 'react'
import { ContactUsForm } from '../../Common/ContactUsForm'

export const ContactFormSection = () => {
  return (
    <div className='mx-auto flex flex-col gap-20'>
      <div className='flex flex-col gap-4'>

        <h1 className='font-semibold text-3xl text-richblack-5 text-center'>Get in Touch</h1>
        <p className=' text-center text-richblack-300 font-medium text-sm'>
            We'd love to here for you, Please fill out this form.
        </p>
      </div>
        <div>
            <ContactUsForm/>
        </div>

    </div>
  )
}
