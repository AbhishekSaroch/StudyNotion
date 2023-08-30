import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
import {HiOutlineCurrencyRupee} from "react-icons/hi"


const CourseInformation = () => {

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState:{errors}
  }=useForm();

  const dispatch=useDispatch();
  const {course,editCourse}=useSelector((state)=>state.course)
  const [loading,setloading]=useState(false);
  const [courseCategories,setCourseCategories]=useState([]);
  useEffect(()=>{
    const getCategories=async()=>{
      setloading(true);
      const categories=await fetchCourseCategories();
      console.log("Categories",categories)
      if(categories.length>0){
        setCourseCategories(categories)
      }
      setloading(false);
    }
    // mapping of strings with values
    if(editCourse){
      setValue("courseTitle",course.courseName)
      setValue("courseShortDesc",course.courseDescription)
      setValue("coursePrice",course.price)
      setValue("courseTags",course.tag)
      setValue("courseBenefits",course.whatYouWillLearn)
      setValue("courseCategory",course.category)
      setValue("courseRequirements",course.instructions)
      setValue("courseImage",course.thumbnail)
    }
    getCategories();
  },[])
  const onSubmit=async(data)=>{

  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}
    className='rounded-md bg-richblack-800 border-richblack-700 p-6 space-y-6'
    >
      <div>
        <label>Course Title <sup>*</sup></label>
        <input 
        id='courseTitle'
        placeholder='Enter Course Title'
        {...register("courseTitle",{required:true})}
        className='w-full'
        />
        {
          errors.courseTitle &&(
            <span>Course Title Is Required ***</span>
          )
        }
      </div>
      <div>
        <label>Course Short Description<sup>*</sup></label>
        <textarea 
        id='courseShortDesc'
        placeholder='Enter The Course Description'
        {...register("courseShortDesc",{required:true})}
        className='w-full min-h-[140px]'
        />
         {
          errors.courseShortDesc &&(
            <span>Course Description Is Required ***</span>
          )
        }
      </div>
      <div className='relative'>
      <label>Course Price<sup>*</sup></label>
        <input 
        id='coursePrice'
        placeholder='Enter Course Price'
        {...register("coursePrice",{required:true,valueAsNumber:true})}
        className='w-full p-1'
        />
        <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400' />
         {
          errors.coursePrice &&(
            <span>Course Price Is Required ***</span>
          )
        }
      </div>
      <div>
        <label>Course Category <sup>*</sup></label>
        <select
        id='courseCategory'
        defaultValue={""}
        {...register("courseCategory",{required:true})}
        >
          <option value="" disabled>Choose A Category</option>
          {
            !loading && courseCategories.map((category,index)=>(
              <option key={index} value={category?.id}>{category?.name}</option>
            ))
          }
          </select>
      </div>

    </form>
  )
}

export default CourseInformation