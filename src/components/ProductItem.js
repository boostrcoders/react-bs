import React from "react";

const ProductItem = props => {
  return (
    <div>
      {props.isEdit ? (
        <div>
          <form onSubmit={this.handleKeyPress.bind(this)}>
            <h3>Add Product</h3>
            <input
              placeholder="Name"
              ref={nameInput => {
                this.nameInput = nameInput;
              }}
            />
            <input
              placeholder="Price"
              ref={priceInput => (this.priceInput = priceInput)}
            />
            <button>Add</button>
            <hr />
            {}
          </form>
        </div>
      ) : (
        <div key={props.name}>
          <span>{props.name}</span> {" | "}
          <span>{props.price}</span>
          {" | "}
          <button onClick={props.onEdit}>Edit</button>
          {" | "}
          <button onClick={props.onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
