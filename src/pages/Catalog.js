import React from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
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
          {/* <CourseSlider /> */}
        </div>
        {/* SECTION 2 */}
        <div>
          <p>Top Courses</p>
          <div>
            {/* <CourseSlider /> */}
          </div>
        </div>
        {/* section 3 */}
        <div>
          <p>Frequently Bought Together</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
