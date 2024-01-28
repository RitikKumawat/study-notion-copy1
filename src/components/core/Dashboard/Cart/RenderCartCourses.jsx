import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice';
import StarRatingComponent from 'react-star-rating-component';


export const RenderCartCourses = () => {
    
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  
    return (
    <div className='flex flex-1 flex-col'>
        {
            cart.map((courses,index)=>(
                <div key={courses._id} className={`flex w-full flex-wrap items-start justify-between gap-6 ${index!== cart.length -1 && 
                "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"}`}>
                    <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                        <img src={courses?.thumbnail}
                            alt={courses?.courseName}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className='flex flex-col space-y-1'>
                            <p className='text-lg font-medium text-richblack-5'>{courses?.courseName}</p>
                            <p className='text-sm text-richblack-300'>{courses?.category?.name}</p>
                            <div className='flex items-center gap-2'>
                                <span className='text-yellow-5'>4.4</span>
                                <StarRatingComponent
                                    starCount={5}
                                    editing={false}
                                    starColor="#ffd700"
                                    renderStarIconHalf={<GiNinjaStar/>}
                                    renderStarIcon={<GiNinjaStar/>}
                                />
                                <span className='text-richblack-400'>{courses?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-end space-y-2'>
                        <button onClick={()=>dispatch(removeFromCart(courses._id))}
                        className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200'>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>  
                        </button>

                        <p className='mb-6 text-3xl font-medium text-yellow-100'>₹ {courses?.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
