import React, { Component } from "react";
import ProductItem from "./components/ProductItem/ProductItem";
import AddProduct from "./components/AddProduct/AddProduct";
import "./App.css";

//CHECK if Products is exist in Local Storage
if ("products" in localStorage) {
} else {
  const products = [
    {
      name: "iPad",
      price: 200
    },
    {
      name: "iPhone",
      price: 650
    }
  ];
  localStorage.setItem("products", JSON.stringify(products));
}
class App extends Component {
  state = {
    products: JSON.parse(localStorage.getItem("products")),
    isEdit: [true, 1]
  };

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
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

  render() {
    return (
      <div>
        <AddProduct onAdd={this.addProduct.bind(this)} />

        <div className="products-container">
          {this.state.products.map((product, key) => {
            return (
              <ProductItem
                isEdit={this.state.isEdit}
                key={key}
                id={key}
                name={product.name}
                price={product.price}
                onEdit={() => this.editProduct(product.name)}
                onDelete={() => this.deleteProduct(key)}
                editSubmit={this.onEditSubmit.bind(this)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
