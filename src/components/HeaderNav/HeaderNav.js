import React, { Component } from "react";
import "./HeaderNav.css";

class HeaderNav extends Component {
  render() {
    return (
      <div className="header-navbar">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header col-xs-6">
              <a className="navbar-brand" href="/react-crud">
                <i className="fas fa-dollar-sign" />
                hopping
              </a>
            </div>
            <div className="navbar-menu-icons col-xs-6">
              <span
                className="header-navbar-btn"
                onClick={this.props.showAddForm}
                title="Add New Item"
              >
                <i className="fas fa-plus" />
              </span>
              <span
                className="header-navbar-btn"
                onClick={this.props.loadFav}
                title="Add New Item"
                style={
                  this.props.favItems === 0
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                <i className="fas fa-heart" />
              </span>

              <span
                className="header-navbar-btn"
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
                    this.props.cartNotif !== 0 && this.props.isLoadCart
                      ? { display: "none" }
                      : this.props.cartNotif === 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  {this.props.cartNotif}
                </span>
                <i className="fas fa-shopping-cart" />
              </span>

              {/* <form className="navbar-form navbar-left" action="/action_page.php">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  name="search"
                />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i class="fas fa-search" />
                  </button>
                </div>
              </div>
            </form> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderNav;
