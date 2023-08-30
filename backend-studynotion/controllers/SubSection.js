const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadVideo = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    const { video } = req.files.videoFile;

    if (!title || !timeDuration || !description || !video) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details ",
      });
    }
    const videoUpload=await uploadVideo(video, process.env.FOLDER_NAME);

    const newSubSection = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      video:videoUpload.secure_url,
    });

    const newSection=await Section.findByIdAndUpdate({_id:sectionId},{
        $push:{
            subSection:newSubSection._id,
        }
    },{new:true})
    return res.status(200).json({
        success: true,
        message: "SubSection Created Successfully",
      });
    
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "SubSection Not Created,Please Try Again",
      });
  }
};
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body
    const subSection = await SubSection.findById(sectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    return res.json({
      success: true,
      message: "Section updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}