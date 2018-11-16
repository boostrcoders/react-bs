import React, { Component } from "react";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductItem from "./components/ProductItem/ProductItem";

import "./App.css";

//CHECK if Products is exist in Local Storage
if ("records" in localStorage) {
  const records = {
    products: [
      {
        name: "iPad",
        price: 200,
        cart: false
      },
      {
        name: "iPhone",
        price: 650,
        cart: false
      }
    ],
    cartItems: 0
  };
  localStorage.setItem("records", JSON.stringify(records));
} else {
  const records = {
    products: [
      {
        name: "iPad",
        price: 200,
        cart: false
      },
      {
        name: "iPhone",
        price: 650,
        cart: false
      }
    ],
    cartItems: 1
  };
  localStorage.setItem("records", JSON.stringify(records));
}
class App extends Component {
  state = {
    records: JSON.parse(localStorage.getItem("records")),
    isEdit: [true, 1],
    isAdd: false
  };

  componentWillMount() {
    const records = this.getRecords();
    this.setState({ records });
    console.log(this.state.records.products);
  }

  getRecords() {
    console.log(this.state);
    return this.state.records;
  }
  //SHOW ADD FORM
  showAddForm() {
    this.setState({ isAdd: !this.state.isAdd });
  }

  //ADD Products
  addProduct(name, price) {
    const records = this.getRecords();
    let id = records.products.length + 1;
    records.products.push({ id, name, price });
    this.setState({ records });
    localStorage.setItem("products", JSON.stringify(records));
  }

  //DELETE Products
  deleteProduct(index) {
    let records = this.getRecords();
    records.products.splice(index, 1);
    this.setState({ records: records });
    localStorage.setItem("products", JSON.stringify(records));
  }

  //EDIT Products
  editProduct(name) {
    this.setState({ isEdit: [true, name] });
  }
  onEditSubmit(name, price, id) {
    let records = this.getRecords();

    records = records.products.map((product, key) => {
      if (key === id) {
        product.name = name;
        product.price = price;
      }
      return product;
    });

    this.setState({ records, isEdit: [false, 0] });
    localStorage.setItem("products", JSON.stringify(records));
  }

  //UPDATE CART NOTIFICATION
  updateCartNotif(id) {
    let records = this.getRecords();
    records = records.products.map((product, key) => {
      if (key === id) {
        product.cart = true;
      }
      return product;
    });
    records.cartItems += 1;
    this.setState({ records });
    localStorage.setItem("products", JSON.stringify(records));
    console.log(records);
  }

  render() {
    return (
      <div>
        <HeaderNav
          showAddForm={this.showAddForm.bind(this)}
          cartNotif={this.state.records.cartItems}
        />
        <AddProduct
          onAdd={this.addProduct.bind(this)}
          isAdd={this.state.isAdd}
        />
        <div className="products-container">
          {this.state.records.products.map((product, key) => {
            return (
              <ProductItem
                isEdit={this.state.isEdit}
                key={key}
                id={key}
                name={product.name}
                price={product.price}
                cart={product.cart}
                onEdit={() => this.editProduct(product.name)}
                onDelete={() => this.deleteProduct(key)}
                editSubmit={this.onEditSubmit.bind(this)}
                addCart={
                  (this.updateCartNotif.bind(this),
                  () => this.updateCartNotif(key))
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
