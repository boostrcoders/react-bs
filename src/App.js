import React, { Component } from "react";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductItem from "./components/ProductItem/ProductItem";

import "./App.css";

//CHECK if Products is exist in Local Storage
if ("products" in localStorage) {
} else {
  const products = [
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
  ];
  localStorage.setItem("products", JSON.stringify(products));
}
class App extends Component {
  state = {
    products: JSON.parse(localStorage.getItem("products")),
    cartItems: 0,
    isEdit: [true, 1],
    isAdd: false
  };

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }
  //SHOW ADD FORM
  showAddForm() {
    this.setState({ isAdd: !this.state.isAdd });
  }

  //ADD Products
  addProduct(name, price) {
    const products = this.getProducts();
    let id = products.length + 1;
    products.push({ id, name, price });
    this.setState({ products });
    localStorage.setItem("products", JSON.stringify(products));
  }

  //DELETE Products
  deleteProduct(index) {
    let productsArr = this.getProducts();
    productsArr.splice(index, 1);
    this.setState({ products: productsArr });
    localStorage.setItem("products", JSON.stringify(productsArr));
  }

  //EDIT Products
  editProduct(name) {
    this.setState({ isEdit: [true, name] });
  }
  onEditSubmit(name, price, id) {
    let products = this.getProducts();

    products = products.map((product, key) => {
      if (key === id) {
        product.name = name;
        product.price = price;
      }
      return product;
    });

    this.setState({ products, isEdit: [false, 0] });
    localStorage.setItem("products", JSON.stringify(products));
  }

  //UPDATE CART NOTIFICATION
  updateCartNotif(id) {
    let products = this.getProducts();
    products = products.map((product, key) => {
      if (key === id) {
        product.cart = true;
      }
      return product;
    });
    this.setState({ products, cartItems: this.state.cartItems + 1 });
    localStorage.setItem("products", JSON.stringify(products));
    console.log(products);
  }

  render() {
    return (
      <div>
        <HeaderNav
          showAddForm={this.showAddForm.bind(this)}
          cartNotif={this.state.cartItems}
        />
        <AddProduct
          onAdd={this.addProduct.bind(this)}
          isAdd={this.state.isAdd}
        />
        <div className="products-container">
          {this.state.products.map((product, key) => {
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
