import React, { Component } from "react";

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
      <div>
        {this.props.isEdit[0] && this.props.isEdit[1] === this.props.name ? (
          <div id={this.props.id}>
            <form onSubmit={this.handleKeyPressEdit.bind(this)}>
              <input
                placeholder="Name"
                ref={nameInput => {
                  this.nameInput = nameInput;
                }}
                defaultValue={this.props.name}
              />
              <input
                placeholder="Price"
                ref={priceInput => (this.priceInput = priceInput)}
                defaultValue={this.props.price}
              />
              <button>Save</button>
              <hr />
              {}
            </form>
          </div>
        ) : (
          <div key={this.props.name}>
            <span>{this.props.name}</span> {" | "}
            <span>{this.props.price}</span>
            {" | "}
            <button onClick={this.props.onEdit}>Edit</button>
            {" | "}
            <button onClick={this.props.onDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductItem;
