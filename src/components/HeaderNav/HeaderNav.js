import React, { Component } from "react";
import "./HeaderNav.css";

class HeaderNav extends Component {
  render() {
    return (
      <div className="header-navbar">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="/">
                <span className="glyphicon glyphicon-usd" />
                hopping
              </a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                {/* <li>
                  <a href="/">
                    <span class="glyphicon glyphicon-search" />
                  </a>
                </li> */}

                <button
                  className="header-navbar-btn"
                  onClick={this.props.showAddForm}
                >
                  <span className="glyphicon glyphicon-plus" />
                </button>
                <button className="header-navbar-btn">
                  <span className="badge cart-notif">
                    {this.props.cartNotif}
                  </span>
                  <span className="glyphicon glyphicon-shopping-cart" />
                </button>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderNav;
