import React, { Component } from "react";
import "./AddProduct.css";

class AddProduct extends Component {
  handleKeyPress = event => {
    event.preventDefault();
    return this.nameInput.value === ""
      ? (alert("Please Input Name"), this.nameInput.focus())
      : this.priceInput.value === ""
      ? (alert("Please Input Price"), this.priceInput.focus())
      : (this.props.onAdd(this.nameInput.value, this.priceInput.value),
        (this.nameInput.value = ""),
        (this.priceInput.value = ""),
        this.nameInput.focus());
  };

  render() {
    return (
      <div className="products-add-form">
        <h1>Products Manager</h1>
        <div className="add-btn">
          <a href="/" className="btn btn-info btn-lg">
            <span className="glyphicon glyphicon-plus" />
          </a>
        </div>
        {/* FORM FOR ADDING NEW PRODUCT */}
        <div className="add-form row">
          <form onSubmit={this.handleKeyPress.bind(this)}>
            <div className="col-sm-5 col-xs-12  add-form-input">
              <input
                className="col-xs-12"
                placeholder="Name"
                ref={nameInput => {
                  this.nameInput = nameInput;
                }}
              />
            </div>

            <div className="col-sm-5 col-xs-12 add-form-input">
              <input
                className="col-xs-12"
                placeholder="Price"
                ref={priceInput => (this.priceInput = priceInput)}
              />
            </div>

            <div className="col-sm-2 col-xs-12 add-form-btn">
              <button className="btn btn-success btn-block">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddProduct;
