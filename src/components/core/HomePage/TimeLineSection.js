import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
const TimeLine=[
  {
    Logo:Logo1,
    heading:"Leadership",
    Description:"Fully Committed to the success of the company"
  },
  {
    Logo:Logo2,
    heading:"Leadership",
    Description:"Fully Committed to the success of the company"
  },
  {
    Logo:Logo3,
    heading:"Leadership",
    Description:"Fully Committed to the success of the company"
  },
  {
    Logo:Logo4,
    heading:"Leadership",
    Description:"Fully Committed to the success of the company"
  },
]
const TimeLineSection = () => {
  return (
    <div>
      <div className='flex gap-15 items-center'>
        <div className='flex flex-col w-[45%] gap-5'>
          {TimeLine.map( (element,index) =>{
            return (
                <div className='flex flex-row gap-6' key={index}>
                    <div className='w-[50px] h-[50px] bg-white flex items-center' >
                      <img src={element.Logo}></img>
                      </div>
                      <div>
                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                        <p className='text-base'>{element.Description}</p>
                      </div>
                  </div>
            )
          })}
        </div>
        <div className='relative shadow-blue-200 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]'>
            <img src={TimeLineImage} className='shadow-white object-cover h-fit' alt='timeline-image'></img>
            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 rounded-sm 
            left-[50%] translate-x-[-40%] translate-y-[-50%]'>
              <div className='flex items-center gap-5 border-r border-caribeangreen-200 px-7'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-caribeangreen-300 text-sm'>Years Of Experience</p>
              </div>
              <div className='flex gap-5 items-center px-7'>
              <p className='text-3xl font-bold'>250</p>
                <p className='text-caribeangreen-300 text-sm'>Types Of Courses</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection