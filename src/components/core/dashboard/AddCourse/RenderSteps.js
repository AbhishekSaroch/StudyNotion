import React from "react";
import { useSelector } from "react-redux";
// import { FaCheck } from "react-icons/fa";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/index"
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  console.log("step value ->", step);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <>
      <div className="">
        <div>
          {steps.map((items,index) => (
            <>
              <div key={index}>
                <div
                  className={`${
                    step == items.id
                      ? "bg-yellow-700 border-yellow-50 text-yellow-50 "
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } `}
                >
                  {/* {step > items.id ? <FaCheck /> : items.id} */}
                </div>
              </div>
              {/* adding code for dashes between labels */}
              {items.id !== steps.length}
            </>
          ))}
        </div>
        <div>
         {
          steps.map((item,index)=>(
       
            <div key={index}>
              <p key={index}>{item.title}</p>
              </div>  
          ))
         }
        </div>
      </div>
      {
        step==1 && <CourseInformation />
      }
      {
        step==2 && <CourseBuilderForm />
      }
      {
        step==3 && <PublishCourse />
      } 
    </>
  );
};

export default RenderSteps;
