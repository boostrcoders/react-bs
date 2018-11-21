import React, { Component } from "react";
import "./HeaderNav.css";

class HeaderNav extends Component {
  render() {
    return (
      <div className="header-navbar">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <span className="glyphicon glyphicon-usd" />
                hopping
              </a>
            </div>

            <button
              className="header-navbar-btn navbar-right"
              onClick={this.props.showAddForm}
              title="Add New Item"
            >
              <span className="glyphicon glyphicon-plus" />
            </button>
            <button
              className="header-navbar-btn navbar-right"
              onClick={this.props.loadCart}
              title="Your Cart"
              style={
                this.props.cartNotif === 0
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              <span
                className="badge cart-notif"
                style={
                  this.props.cartNotif === 0
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                {this.props.cartNotif}
              </span>
              <span className="glyphicon glyphicon-shopping-cart" />
            </button>

            <form className="navbar-form navbar-left" action="/action_page.php">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  name="search"
                />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderNav;
