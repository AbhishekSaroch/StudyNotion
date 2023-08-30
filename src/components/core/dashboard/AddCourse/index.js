import React from "react";
import RenderSteps from "./RenderSteps";
const AddCourse = () => {
  return (
    <div className="text-white  w-100vw flex">
      <div className="flex gap-x-20">
        <div>
          <h1>Add Course</h1>
          {/* render form according to 1 2 3 */}
          <div>
            <RenderSteps />
          </div>
        </div>
        <div className="flex flex-col gap-y-5 border-white border h-fit ">
          <p className="text-center">Code Upload Tips</p>
          <ul className="">
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
            <li>Set Course Price Option OR Make it free</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
