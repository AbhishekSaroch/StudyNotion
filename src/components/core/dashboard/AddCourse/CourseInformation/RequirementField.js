import React, { useEffect } from "react";
import { useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };
  useEffect(()=>{
    register(name,{required:true,validate:(value)=>value.length >0})
  },[])

//   mapping
  useEffect(()=>{
    setValue(name,requirementList)
  },[requirementList])


  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };
  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full text-black"

        />
        <button
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
          type="button"
        >
          Add
        </button>
      </div>
      {
        requirementList.length > 0 && (
            <ul>
                {
                    requirementList.map((requirement,index)=>(
                        <li key={index} className="flex items-center text-richblack-5"><span>{requirement}</span>
                        <button 
                        type="button"
                        onClick={()=>handleRemoveRequirement(index)}
                        className="text-xs text-pure-greys-300"
                        >Clear</button>
                        </li>
                    ))
                }
            </ul>
        )
      }
      {
        errors[name] &&(
            <span>{label} is Required</span>
        )
      }
    </div>
  );
};

export default RequirementField;
