import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Your Cart</h1>
      <p>{totalItems} Courses In Cart</p>
      {total > 0 ? (
        <div>
          <RenderCardCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart Is Empty</p>
      )}
    </div>
  );
};

export default Cart;
