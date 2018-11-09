import React, { Component } from "react";

class AddProduct extends Component {
  handleKeyPress = event => {
    event.preventDefault();
    this.props.onAdd(this.nameInput.value, this.priceInput.value);
    this.nameInput.value = "";
    this.priceInput.value = "";
    this.nameInput.focus();
  };

  render() {
    return (
      <form onSubmit={this.handleKeyPress.bind(this)}>
        <h3>Add Product</h3>
        <input
          autoFocus
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
    );
  }
}

export default AddProduct;
