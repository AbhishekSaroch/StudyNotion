// create course
const Section=require("../models/Section")
const Course=require("../models/Course")

exports.createSection=async(req,res)=>{
    try {
        const {sectionName,courseId}=req.body;
        if(!sectionName){
            return res.status(401).json({
                success:false,
                message:"Please fill the section name",
            })
        }
        const newSection=await Section.create({sectionName});
        const newCourse=await Course.findByIdAndUpdate({courseId},{
            $push:{
                courseContent:newSection._id,
            }
        },{new:true}).populate
        return res.status(200).json({
            success:true,
            message:"Setion Created Successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Section Not Created",
        })
    }
}

exports.updateSection=async(req,res)=>{
    try {
        const {sectionName,sectionId}=req.body;

        if(!sectionName ||!sectionId){
            return res.status(401).json({
                success:false,
                message:"Please fill all the details",
            })
        }
        const updatedSection=await Section.findByIdAndUpdate({sectionId},
            {sectionName:sectionName},{new:true})
            return res.status(200).json({
                success:false,
                message:"Section Updated Successfully ",
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Section Not Updated",
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try {
        const {sectionId}=req.params;
        await Section.findByIdAndDelete({sectionId})

        return res.status(200).json({
            success:true,
            message:"section Deleted",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"section Not deleted",
        })
    }
}