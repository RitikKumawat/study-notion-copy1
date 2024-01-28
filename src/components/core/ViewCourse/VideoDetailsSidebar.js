import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconBtn } from '../../Common/IconBtn';
import { IoIosArrowBack } from 'react-icons/io';
import { BiSolidChevronDown } from 'react-icons/bi';

export const VideoDetailsSidebar = ({setReviewModal}) => {
    
    const [activeStatus,setActiveStatus] = useState("");
    const [videobarActive, setvideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,subSectionId} =  useParams();
    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures} = useSelector((state)=>state.viewCourse);
    
    useEffect(()=>{
        ;(()=>{
            
                
            const currentSectionIndex = courseSectionData.findIndex(
                (data)=> data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data)=> data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSectionIndex]?._id;
            // setting current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // setting current subSection here
            setvideoBarActive(activeSubSectionId);

        })()
    },[courseSectionData,courseEntireData,location.pathname])

    const handleAddReview = ()=>{
        console.log("I am inside add review");
        setReviewModal(true);
    }
    return (
    <>
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
            {/* buttons and heading */}
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                {/* for buttons */}
                <div className="flex w-full items-center justify-between ">
                    <div onClick={()=>navigate("/dashboard/enrolled-courses")}
                    className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                    title="back"
                    >
                        <IoIosArrowBack size={30}/>
                    </div>
                    <div>
                        <IconBtn
                            text="Add Review"
                            customClasses="ml-auto"
                            onclick={()=> handleAddReview()}

                        />
                    </div>
                </div>
                {/* for heading and title */}
                <div className="flex flex-col">
                    <p>{courseEntireData?.courseName}</p>
                    <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length}/{totalNoOfLectures}</p>
                </div>
                <div>

                </div>
            </div>

            {/* for sections and subsections */}
            <div  className="h-[calc(100vh - 5rem)] overflow-y-auto">
                {
                    courseSectionData.map((section,index)=>(
                        <div
                            className="mt-2 cursor-pointer text-sm text-richblack-5"
                            onclick={()=>setActiveStatus(section?._id)}
                            key={index}
                        >
                        {/* section */}
                        <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                            <div className="w-[70%] font-semibold">
                                {section?.sectionName}
                            </div>
                            {/* todo-add arrow icon and handle rotate logic */}
                            <div className="flex items-center gap-3">
                            {/* <span className="text-[12px] font-medium">
                                Lession {course?.subSection.length}
                            </span> */}
                            <span
                                className={`${
                                activeStatus === section?.sectionName
                                    ? "rotate-0"
                                    : "rotate-180"
                                } transition-all duration-500`}
                            >
                                <BiSolidChevronDown />
                            </span>
                            </div>

                        </div>
                        
                        {/* subsections */}
                        <div>
                            {
                                activeStatus === section?._id && (
                                    <div className="transition-[height] duration-500 ease-in-out">
                                        {
                                            section.subSection.map((topic,index)=>(
                                                <div
                                                className={`flex gap-3 px-5 py-2 ${
                                                    videobarActive === topic._id ?
                                                    "bg-yellow-200 text-richblack-900" :
                                                    "bg-richblack-900 text-richblack-5"}`}
                                                key={index}
                                                onclick={()=>{
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setvideoBarActive(topic?._id);
                                                }}
                                                >
                                                    <input
                                                        type='checkbox'
                                                        checked={completedLectures.includes(topic?._id)}
                                                        onChange={()=>{}}
                                                    />
                                                    <span>
                                                        {topic.title}
                                                    </span>
                                                </div>
                                            )) 
                                        }
                                    </div>
                                )
                            }
                        </div>

                        </div>
                    ))
                }
            </div>
            
        </div>

    </>
  )
}
