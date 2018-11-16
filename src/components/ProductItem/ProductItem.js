import React, { Component } from "react";
import "./ProductItem.css";

class ProductItem extends Component {
  handleKeyPressEdit = event => {
    event.preventDefault();
    return this.nameInput.value === ""
      ? (alert("Please Input Name"), this.nameInput.focus())
      : this.priceInput.value === ""
      ? (alert("Please Input Price"), this.priceInput.focus())
      : this.props.editSubmit(
          this.nameInput.value,
          this.priceInput.value,
          this.props.id
        );
  };
  render() {
    return (
      <div className="item-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
        {this.props.isEdit[0] && this.props.isEdit[1] === this.props.name ? (
          <div className="text-center item-card-edit" id={this.props.id}>
            <form onSubmit={this.handleKeyPressEdit.bind(this)}>
              <div className="item-name-input">
                <input
                  placeholder="Name"
                  ref={nameInput => {
                    this.nameInput = nameInput;
                  }}
                  defaultValue={this.props.name}
                />
              </div>

              <div className="item-name-input">
                <input
                  placeholder="Price"
                  ref={priceInput => (this.priceInput = priceInput)}
                  defaultValue={this.props.price}
                />
              </div>

              <div className="text-right item-btn">
                <button
                  title="Save"
                  className="btn btn-success btn-save-cart text-success"
                >
                  <i className="far fa-save" /> Save
                </button>
              </div>
            </form>
          </div>
        ) : !this.props.cart ? (
          <div className="text-center item-card-inner" key={this.props.name}>
            <div className="item-name">
              <span>{this.props.name}</span>
            </div>

            <div className="price">
              <span>{this.props.price}</span>
            </div>
            <div className="text-right item-btn">
              <button
                onClick={this.props.addCart}
                title="Add to Cart"
                className="btn btn-info btn-add-cart"
              >
                <i className="fa fa-cart-plus" />
              </button>
              <button
                title="Edit"
                className="btn text-primary btn-edit-cart"
                onClick={this.props.onEdit}
              >
                <i className="far fa-edit" />
              </button>
              <button
                title="Delete"
                className="btn text-danger btn-delete-cart"
                onClick={this.props.onDelete}
              >
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductItem;
