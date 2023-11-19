import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import {getCatalogaPageData} from "../services/operations/pageAndComponentData"
import Course_Card from '../components/core/Catalog/Course_Card'


const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    // when catalog name change -> this code works
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            // getting the category id from catalog dropdown
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
            console.log("Category id",category_id)
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("Printing The Catalog page: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


  return (
    <div className='text-white'>

        <div>
            <p>{`Home / Catalog /`}
            <span>
                {catalogPageData?.data?.selectedCategory?.name}
            </span></p>
            <p> {catalogPageData?.data?.selectedCategory?.name} </p>
            <p> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* section1 */}
            <div>
            <div>Hey Folks You Can Get Started With These Courses</div>
                <div className=' flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    {/* <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} /> */}
                </div>
            </div>  

            {/* section2 */}
            <div>
            <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div>
                <div>
                    {/* <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/> */}
                </div>
            </div>

            {/* section3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
    <Footer />
    </div>
  )
}

export default Catalog
