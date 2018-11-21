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
      <React.Fragment>
        {this.props.isEdit[0] && this.props.isEdit[1] === this.props.name ? (
          //LOAD SHOPPING STORE

          //LOAD SHOPPING STORE UPDATE MODE
          <div className="item-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
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
          </div>
        ) : // LOAD SHOPPING STORE NORMAL MODE
        !this.props.isLoadCart && !this.props.cart[0] ? (
          <div className="item-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
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
          </div>
        ) : //LOAD YOUR CART
        this.props.isLoadCart && this.props.cart[0] ? (
          <div className="row cart-item">
            <div className="col-sm-4 col-xs-12 text-center cart-item-name">
              {this.props.name}
            </div>

            <div className="col-sm-4 col-xs-5 text-center cart-item-details">
              <button
                className="btn btn-sm btn-delete-cart"
                id="minus-btn"
                onClick={this.props.subCartQuantity}
                style={{
                  visibility: this.props.cart[1] === 1 ? "hidden" : "visible"
                }}
              >
                <i className="fa fa-minus" />
              </button>
              <span className="label label-default">{this.props.cart[1]}</span>
              <button
                className="btn btn-sm btn-edit-cart"
                id="plus-btn"
                onClick={this.props.addCartQuantity}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="col-sm-3 col-xs-5 text-left cart-item-details">
              <span className="text-default">
                <i className="fas fa-dollar-sign">
                  {" "}
                  {this.props.price * this.props.cart[1]}
                </i>
              </span>
            </div>
            <div className="col-xs-1 text-right cart-item-details">
              <button
                title="Delete"
                className="btn text-danger btn-delete-cart"
                onClick={this.props.removeCart}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default ProductItem;
