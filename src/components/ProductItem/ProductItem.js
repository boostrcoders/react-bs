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
      <div className="item-card col-lg-3 col-sm-4 col-xs-12">
        {this.props.isEdit[0] && this.props.isEdit[1] === this.props.name ? (
          <div className="text-center" id={this.props.id}>
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
                <button className="btn btn-success">Save</button>
              </div>
              {}
            </form>
          </div>
        ) : (
          <div className="text-center" key={this.props.name}>
            <div className="item-name">
              <span>{this.props.name}</span>
            </div>

            <div className="price">
              <span>{this.props.price}</span>
            </div>

            <div className="text-right item-btn">
              <button className="btn btn-primary" onClick={this.props.onEdit}>
                <span className="glyphicon glyphicon-pencil" />
              </button>{" "}
              <button className="btn btn-danger" onClick={this.props.onDelete}>
                <span className="glyphicon glyphicon-trash" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductItem;
