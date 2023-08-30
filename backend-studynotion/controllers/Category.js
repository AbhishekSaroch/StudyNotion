const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All the details",
      });
    }
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);
    
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured in creating the Category",
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find()
    return res.status(200).json({
        success:true,
        message:"All Categorys fetched successfully",
        data:allCategorys,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Error occured while getting all the Categorys",
    })
  }
};

exports.categoryPageDetails=async(req,res)=>{
  try {
    const {categoryId}=req.body;

    const selectedCategory=await Category.findById(categoryId).poplate("courses").exec();
    // validation
    if(!selectedCategory){
      return res.status(404).json({
        success:false,
        message:"Data Not Found"
      })
    }
    // courses for different categories
    const differentCategories=await Category.find({_id:{$ne:categoryId},}).populate("courses").exec();
    // get top 10 selling courses
    // get top selling courses
    return res.status(200).json({
      success:true,
      data:{
        selectedCategory,
        differentCategories,
      }
    })
  } catch (error) {
      console.error(error)
      return res.status(500).json({
        success:false,
        message:"Category Page Details Not Found"
      })
  }
}
