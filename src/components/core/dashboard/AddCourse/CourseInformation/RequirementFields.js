import React from 'react'
import { useState } from 'react'

const RequirementFields = ({name,label,register,setValue,getValues,errors}) => {
    const [requirement,setRequirement]=useState("")
    const [requirementList,setRequirementList]=useState([])

    const handleAddRequirement=()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement])
            setRequirement("")
        }
    }
    const handleRemoveRequirement=()=>{
        const updatedList=[...requirementList]
        updatedList.splice(index,1)
        setRequirementList(updatedList)
    }

  return (
    <div>
        <label>{label}<sup>*</sup></label>

    </div>
  )
}

export default RequirementFields