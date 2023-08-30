import React from 'react'
import { useForm } from 'react-hook-form'

const CourseBuilderForm = () => {
    const {register,setValue,handleSubmit,formState:{errors} }=useForm();
  return (
    <div>

        <p>Course Builder</p>
        <form>
            <div>
            <label>Section Name<sup>*</sup></label>
            <input 
            id='sectionName'
            placeholder='Add A Course'
            {...register("sectionName",{required:true})}
            className='w-full'
            />
            {
                errors.sectionName &&(
                    <span>Name Is Required</span>
                )
            }
            </div>
            <div>
                <iconBtn />
            </div>
        </form>
    </div>
  )
}

export default CourseBuilderForm