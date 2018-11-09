import React from "react";

const ProductItem = props => {
  return (
    <div key={props.name}>
      <span>{props.name}</span> {" | "}
      <span>{props.price}</span>
      {" | "}
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
};

export default ProductItem;
