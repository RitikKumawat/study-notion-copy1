import React from 'react'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutUs1.png"
import BannerImage2 from "../assets/Images/aboutUs2.png"
import BannerImage3 from "../assets/Images/aboutUs3.png"
import { Quote } from '../components/core/AboutPage/Quote'
import foundingStory from "../assets/Images/our_foundation.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactFormSection } from '../components/core/AboutPage/ContactFormSection'
import { Footer } from '../components/Common/Footer'
import { ReviewSlider } from '../components/Common/ReviewSlider'

export const About = () => {
  return (
    <div className=' text-white '>
        <div className=' mx-auto'>

        {/* section 1 */}
        
        <section className='h-[580px] bg-richblack-800  '>
            <div className='flex flex-col gap-14 w-11/12 max-w-maxContent mx-auto'>
                <div className='flex flex-col gap-5 items-center  mt-20'>
                <p className='font-medium text-sm text-richblack-300'>About Us</p>
                <header className=' text-richblack-5 font-semibold text-3xl text-center w-[50%]'>
                    Driving Innovation in Online Education for a <br/>
                    <HighlightText text={"Brighter Future"}/>
                </header>
                    <p className=' text-richblack-300 font-medium text-sm text-center w-[60%] leading-6 '>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
                <div className='flex gap-x-6 mx-auto '>
                    <img src={BannerImage1}/>
                    <img src={BannerImage2}/>
                    <img src={BannerImage3}/>
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section className='w-11/12 max-w-maxContent mx-auto mt-24'>
            <div>
                <Quote/>
            </div>
        </section>

        {/* section 3 */}
        <section className='w-11/12 max-w-maxContent mx-auto '>
            <div className='flex flex-col text-richblack-300 '>
                {/* founding story div */}
                <div className='flex gap-24 my-24 ml-10'>
                    <div className='flex flex-col w-[486px] gap-6'>
                        <h1 className='text-[#FD1D1D] font-semibold text-3xl'>Our Founding Story</h1>
                        <p className='font-medium text-sm leading-6'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='font-medium text-sm leading-6'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className=' lg:w-[534px] p-8'>
                        <img src={foundingStory}/>
                    </div>

                </div>

                {/* vision and mission div */}
                <div className='flex my-24 gap-24 ml-10'>   
                    <div className='flex flex-col gap-6 w-[486px]'>
                        <h1 className='text-[#E65C00] font-semibold text-3xl'>Our Vision</h1>
                        <p className='font-medium text-sm leading-6 '>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className='flex flex-col gap-6 w-[486px] '>
                        <h1 className='font-semibold text-3xl'>

                        <HighlightText text={"Our Mission"}/>
                        </h1>
                        <p className='font-medium text-sm leading-6'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* section 4 */}
        <StatsComponent/>

        {/* section 5 */}
        <section className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-5 mb-[140px] '>
            <LearningGrid/>
            <ContactFormSection/>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto'>
            <div>
                Reviews from other learners
                {/* Review Slider */}
                <ReviewSlider/>
            </div>
        </section>
        </div>
       

        <Footer/>
        
    </div>
  )
}
