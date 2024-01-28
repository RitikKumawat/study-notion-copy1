import React from 'react'

const Stats = [
    {count:"5K", label:"Active Students"},
    {count:"10+", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"50+", label:"Awards"},
]


function StatsComponent() {
  return (
    <section>
        <div className='my-24 bg-richblack-800  '>
            <div className='flex gap-x-5 justify-between items-center  w-11/12 max-w-maxContent mx-auto '>
                {
                    Stats.map( (data,index)=>{
                        return (
                            <div key={index} className='flex flex-col gap-3 my-24'>
                                <h1 className='text-richblack-5 font-bold text-3xl text-center'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-500 font-semibold text-lg text-center'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent