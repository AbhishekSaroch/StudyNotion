import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import { BsFillForwardFill } from "react-icons/bs";
import HighlightText from './HighlightText'
import CTAButton from './Button'
const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex gap-20 items-center'>
            <div className='w-[50%]'>
                <img src={instructor} alt='instructor-photo'></img>
            </div>
            <div className='w-[50%] flex flex-col'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become An <HighlightText text={"Instructor"} />
                </div>
                <p className='font-medium text-[16px] w-[70%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <div className='w-fit mt-3'>
                <CTAButton linkto={"/signup"} active={true}>  <div className='flex gap-5 items-center'>Start Teaching Today
                 <BsFillForwardFill /></div></CTAButton>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection