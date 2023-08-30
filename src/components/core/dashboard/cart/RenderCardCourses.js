import React from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import {GiNinjaStar} from "react-icons/gi"
const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div>
      {cart.map((course, index) => (
        <div>
          <div>
            <img src={course?.thumbnail}></img>
            <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                    <ReactStars 
                    edit={false}
                    count={5}
                    size={20}
                    activeColor="#ffd700"
                    fullIcon={<GiNinjaStar />}
                    emptyIcon={<GiNinjaStar />}
                    />
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
