import React from 'react'
import HighlightText from './HighlightText'
import Knowyourprogress from "../../../assets/Images/Know_your_progress.png"
import comparewithothers from "../../../assets/Images/Compare_with_others.png"
import planyourlesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl text-center font-semibold'>
          Your Swiss Knife for
          <HighlightText text={"learning any language"} />
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[60%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={Knowyourprogress} alt='knowyourprogress' className='object-contain -mr-32'></img>
          <img src={comparewithothers} alt='comparewithothers' className='object-contain'></img>
          <img src={planyourlesson} alt='planyourlesson' className='object-contain -ml-36'></img>
        </div>
        <div className='mx-auto w-fit'>
          <CTAButton  active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection