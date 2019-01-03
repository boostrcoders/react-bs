import React, { Component } from "react";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import AddProduct from "./components/AddProduct/AddProduct";
import ProductItem from "./components/ProductItem/ProductItem";
import "./App.css";

//CHECK if Products is exist in Local Storage
if ("products" in localStorage) {
} else {
  const products = [
    { name: "iPad", price: 200, cart: [false, 0], favorite: [false, 0] },
    { name: "iPhone", price: 650, cart: [false, 0], favorite: [false, 0] },
    {
      name: "Cherry Mobile",
      price: "20",
      cart: [false, 0],
      favorite: [false, 0]
    },
    { name: "Lenovo", price: "100", cart: [false, 0], favorite: [false, 0] },
    { name: "Samsung", price: "250", cart: [false, 0], favorite: [false, 0] },
    { name: "LG", price: "150", cart: [false, 0], favorite: [false, 0] },
    { name: "ViVo", price: "80", cart: [false, 0], favorite: [false, 0] },
    { name: "OPPO", price: "70", cart: [false, 0], favorite: [false, 0] }
  ];
  localStorage.setItem("products", JSON.stringify(products));
}

class App extends Component {
  state = {
    products: JSON.parse(localStorage.getItem("products")),
    cartItems: 0,
    cartTotalPrice: 0,
    favItems: 0,
    favTotalPrice: 0,
    isEdit: [true, 1],
    isAdd: false,
    isLoadCart: false,
    isLoadFav: false
  };

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
    this.checkStatusCartNotif();
    this.checkFavStat();
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
  }

  //LOAD CART
  loadCart() {
    this.setState({
      isLoadCart: true,
      isAdd: false,
      isLoadFav: false
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
      cartTotalPrice: this.state.cartTotalPrice - temp_price,
      isLoadCart: this.state.cartItems === 1 ? false : true
    });
    localStorage.setItem("products", JSON.stringify(products));
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
      }
      //else if (key === id && product.cart[1] === 1) {}
      return product;
    });
    this.setState({
      products,
      cartTotalPrice: this.state.cartTotalPrice - temp_price
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
  //LOAD Favorites
  loadFav() {
    this.setState({
      isLoadFav: true,
      isAdd: false,
      isLoadCart: false
    });
    console.log(this.state.isLoadFav);
  }
  //STATUS FAVORITES
  checkFavStat() {
    let products = this.getProducts();
    let count = 0;

    products = products.map(product => {
      if (product.favorite[0] === true) {
        this.setState({
          favItems: (count += 1)
        });
      }
      return products;
    });
  }

  // ADD ITEM TO FAVORITE LIST
  addFavList(id) {
    let products = this.getProducts();
    let count = 0;
    products = products.map((product, key) => {
      if (key === id) {
        product.favorite[0] = !product.favorite[0];
        product.favorite[1] = product.favorite[0] ? 1 : 0;
      }

      if (product.favorite[0] === true) {
        count += 1;
      }

      return product;
    });
    this.setState({
      products,
      favItems: count
    });
    localStorage.setItem("products", JSON.stringify(products));
    console.log(this.state.favItems);
  }

  render() {
    let titleHeader =
      !this.state.isLoadCart && !this.state.isLoadFav
        ? "SHOPPING STORE"
        : !this.state.isLoadCart && this.state.isLoadFav
        ? "Favorites"
        : "YOUR CART";
    return (
      <div>
        <HeaderNav
          showAddForm={this.showAddForm.bind(this)}
          cartNotif={this.state.cartItems}
          favItems={this.state.favItems}
          isLoadCart={this.state.isLoadCart}
          loadCart={this.loadCart.bind(this)}
          loadFav={this.loadFav.bind(this)}
        />
        <AddProduct
          onAdd={this.addProduct.bind(this)}
          isAdd={this.state.isAdd}
        />
        <h1>{titleHeader}</h1>

        <div className="products-container">
          {this.state.products.map((product, key) => {
            return (
              <ProductItem
                isEdit={this.state.isEdit}
                isLoadCart={this.state.isLoadCart}
                isLoadFav={this.state.isLoadFav}
                key={key}
                id={key}
                name={product.name}
                price={product.price}
                cart={product.cart}
                fav={product.favorite}
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
                addFav={
                  (this.subCartQuantity.bind(this), () => this.addFavList(key))
                }
              />
            );
          })}
          <h3
            className="cart-below-note"
            style={
              !this.state.isLoadCart
                ? { display: "none" }
                : { display: "block" }
            }
          >
            Total Price:
            <span id="total-price">
              &nbsp;
              <i className="fas fa-dollar-sign"> {this.state.cartTotalPrice}</i>
            </span>
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
