import React, { Component } from "react";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductItem from "./components/ProductItem/ProductItem";
import "./App.css";

//CHECK if Products is exist in Local Storage
if ("products" in localStorage) {
} else {
  const products = [
    { name: "iPad", price: 200, cart: [false, 0] },
    { name: "iPhone", price: 650, cart: [false, 0] },
    { name: "Cherry Mobile", price: "20", cart: [false, 0] },
    { name: "Lenovo", price: "100", cart: [false, 0] },
    { name: "Samsung", price: "250", cart: [false, 0] },
    { name: "LG", price: "150", cart: [false, 0] },
    { name: "ViVo", price: "80", cart: [false, 0] },
    { name: "OPPO", price: "70", cart: [false, 0] }
  ];
  localStorage.setItem("products", JSON.stringify(products));
}

class App extends Component {
  state = {
    products: JSON.parse(localStorage.getItem("products")),
    cartItems: 0,
    cartTotalPrice: 0,
    isEdit: [true, 1],
    isAdd: false,
    isLoadCart: false
  };

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
    this.checkStatusCartNotif();
  }

  getProducts() {
    return this.state.products;
  }

  //SHOW ADD FORM
  showAddForm() {
    this.setState({
      isAdd: !this.state.isAdd,
      isLoadCart: false
    });
  }

  //ADD PRODUCT
  addProduct(name, price) {
    const products = this.getProducts();
    const cart = [false, 0];
    products.push({ name, price, cart });
    this.setState({ products });
    localStorage.setItem("products", JSON.stringify(products));
  }

  //DELETE PRODUCT
  deleteProduct(index) {
    let productsArr = this.getProducts();
    productsArr.splice(index, 1);
    this.setState({ products: productsArr });
    localStorage.setItem("products", JSON.stringify(productsArr));
  }

  //EDIT PRODUCT
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

  //STATUS CART NOTIFICATIONS
  checkStatusCartNotif() {
    let products = this.getProducts();
    let count = 0;
    let temp_price = 0;
    products = products.map(product => {
      if (product.cart[0] === true) {
        temp_price += product.price * product.cart[1];
        this.setState({
          cartItems: (count += 1),
          cartTotalPrice: temp_price
        });
      }
      return products;
    });
    console.log(this.state.cartTotalPrice);
  }

  //LOAD CART
  loadCart() {
    this.setState({
      isLoadCart: !this.state.isLoadCart,
      isAdd: false
    });
  }

  //UPDATE CART NOTIFICATION
  updateCartNotif(id) {
    let products = this.getProducts();
    let temp_price = 0;
    products = products.map((product, key) => {
      if (key === id) {
        product.cart[0] = true;
        product.cart[1] = 1;
        temp_price = product.price * product.cart[1];
      }
      return product;
    });
    this.setState({
      products,
      cartItems: this.state.cartItems + 1,
      cartTotalPrice: this.state.cartTotalPrice + temp_price
    });
    localStorage.setItem("products", JSON.stringify(products));
  }

  //UPDATE CART NOTIFICATION REMOVE FROM CART
  updateCartNotifRemove(id) {
    let products = this.getProducts();
    let temp_price = 0;
    products = products.map((product, key) => {
      if (key === id) {
        temp_price = product.price * product.cart[1];
        product.cart[0] = false;
        product.cart[1] = 0;
      }
      return product;
    });
    this.setState({
      products,
      cartItems: this.state.cartItems - 1,
      cartTotalPrice: this.state.cartTotalPrice - temp_price
    });
    localStorage.setItem("products", JSON.stringify(products));
    console.log(this.state.cartTotalPrice, temp_price);
  }

  //UPDATE CART QUANTITY ADD
  addCartQuantity(id) {
    let products = this.getProducts();
    let temp_price = 0;
    products = products.map((product, key) => {
      if (key === id) {
        product.cart[1] += 1;
        temp_price = parseInt(product.price);
      }
      return product;
    });
    this.setState({
      products,
      cartTotalPrice: this.state.cartTotalPrice + temp_price
    });
    localStorage.setItem("products", JSON.stringify(products));
  }

  //UPDATE CART QUANTITY SUB
  subCartQuantity(id) {
    let products = this.getProducts();
    let temp_price = 0;
    products = products.map((product, key) => {
      if (key === id && product.cart[1] !== 1) {
        product.cart[1] -= 1;
        temp_price = parseInt(product.price);
      } else if (key === id && product.cart[1] === 1) {
      }
      return product;
    });
    this.setState({
      products,
      cartTotalPrice: this.state.cartTotalPrice - temp_price
    });
    localStorage.setItem("products", JSON.stringify(products));
  }

  render() {
    let titleHeader = !this.state.isLoadCart ? "SHOPPING STORE" : "YOUR CART";
    return (
      <div>
        <HeaderNav
          showAddForm={this.showAddForm.bind(this)}
          cartNotif={this.state.cartItems}
          loadCart={this.loadCart.bind(this)}
        />
        <AddProduct
          onAdd={this.addProduct.bind(this)}
          isAdd={this.state.isAdd}
        />
        <h1
          style={
            !this.state.isLoadCart
              ? { textAlign: "center" }
              : { textAlign: "left" }
          }
        >
          {titleHeader}
          <span
            id="total-price"
            style={
              !this.state.isLoadCart
                ? { display: "none" }
                : { textAlign: "block" }
            }
          >
            <i className="fas fa-dollar-sign"> {this.state.cartTotalPrice}</i>
          </span>
        </h1>

        <div className="products-container">
          {this.state.products.map((product, key) => {
            return (
              <ProductItem
                isEdit={this.state.isEdit}
                isLoadCart={this.state.isLoadCart}
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
                removeCart={
                  (this.updateCartNotifRemove.bind(this),
                  () => this.updateCartNotifRemove(key))
                }
                addCartQuantity={
                  (this.addCartQuantity.bind(this),
                  () => this.addCartQuantity(key))
                }
                subCartQuantity={
                  (this.subCartQuantity.bind(this),
                  () => this.subCartQuantity(key))
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
