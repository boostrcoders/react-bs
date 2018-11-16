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
      this.props.isAdd && (
        <div className="products-add-form">
          <div className="add-form well row">
            <form onSubmit={this.handleKeyPress.bind(this)}>
              <div className="row">
                <div className="col-sm-5 col-xs-12  add-form-input">
                  <input
                    className="form-control"
                    placeholder="Name"
                    ref={nameInput => {
                      this.nameInput = nameInput;
                    }}
                  />
                </div>

                <div className="col-sm-5 col-xs-12 add-form-input">
                  <input
                    className="form-control"
                    placeholder="Price"
                    ref={priceInput => (this.priceInput = priceInput)}
                  />
                </div>

                <div className="col-sm-2 col-xs-12 add-form-btn">
                  <button className="btn btn-success btn-block">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default AddProduct;
