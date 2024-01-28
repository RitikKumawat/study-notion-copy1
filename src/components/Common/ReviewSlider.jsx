import React, { useEffect, useState } from 'react'
import {Swiper ,SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation,Pagination } from 'swiper'

import ReactStars from "react-rating-stars-component"
import { apiconnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa6'

export const ReviewSlider = () => {
  
    const [reviews,setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const {data} = await apiconnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
            // console.log("Response get reviews....",response);
            console.log("DATA>...",data);
            if(data?.success){
                setReviews(data?.data);
            }
            console.log("Printing Reviews",reviews);
        }
        fetchAllReviews();
    },[]);
  
    return (
    <div className="w-full text-white">
        <div className='my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent'>
            <Swiper
                slidesPerView={4}
                spaceBetween={24}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay:2500,
                    disableOnInteraction:false
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className='w-full'

            >
            {
                reviews.map((review,index)=>(
                    <SwiperSlide key={index}>
                    <div className="flex min-w-[200px] flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                        <div className="flex items-center gap-4">
                        <img
                            src={review?.user?.image ? review?.user?.image :
                            `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`}
                            alt='Profile Pic'
                            className='h-9 w-9 object-cover rounded-full'
                        />
                        <div className="flex flex-col">
                        <h1 className="font-semibold text-richblack-5">{review?.user?.firstName} {review?.user?.lastName}</h1>
                        <h2 className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</h2>
                        <p>
                            {
                                review?.review
                            }
                        </p>
                        <p>{review?.rating.toFixed(1)}</p>
                        <ReactStars
                            count={5}
                            value={review.rating}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<FaStar/>}
                            fullIcon={<FaStar/>}
                        />
                        </div>
                        </div>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>

    </div>
  )
}
