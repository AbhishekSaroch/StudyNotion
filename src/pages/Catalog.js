import React from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";
const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // fetch all categories
  useEffect(()=>{
      console.log(catalogName)
      const getCategoryDetails=async ()=>{
        const res=await apiConnector("GET",categories.CATEGORIES_API);
        // selecting category id
        const category_Id=res?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName[0]._id)
        setCategoryId(category_Id)
      }
  },[catalogName])
  useEffect(()=>{

  },[categoryId])
  return (
    <div className="text-white">
      <div>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div>
        {/* section1 */}
        <div>
          <div className="flex">
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <CourseSlider Coureses={catalogPageData?.data?.setCategory?.courses}/>
        </div>
        {/* SECTION 2 */}
        <div>
          <p>Top Courses</p>
          <div>
            <CourseSlider Coureses={catalogPageData?.data?.differentCategory?.courses}/>
          </div>
        </div>
        {/* section 3 */}
        <div>
          <div>Frequently Bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {
                catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>{
                  <Course_Card key={index} course={course} />
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
