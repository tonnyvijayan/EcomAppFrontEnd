import "./TopNavBar.css";
import brandLogo from "./assets/brand-logo.svg";
import wishlist from "./assets/wishlist.svg";
import cart from "./assets/cart.svg";
import user from "./assets/user.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";

export const TopNavBar = () => {
  const { state } = useProductContext();
  const { authState } = useAuth();
  const [toogleMenu, setToogleMenu] = useState(false);
  const [toogleCategories, setToogleCategories] = useState(false);

  const menuHandler = () => {
    setToogleMenu((prev) => !prev);
  };

  const categoriesDropDownHandler = () => {
    setToogleCategories((prev) => !prev);
  };
  return (
    <div className="Top-Nav-Bar-Container">
      <div className="brand-logo-container">
        <Link to="/">
          <img src={brandLogo} alt="brand-logo" className="brand-logo" />
        </Link>

        <strong>PlantMart</strong>
      </div>
      {/* {JSON.stringify(authState)} */}
      {/* {JSON.stringify(state.wishlistItems)} */}

      {/*  */}
      <div className="user-detail-container">
        <div className="icon-badge-container">
          {state.cartItems.length > 0 ? (
            <span className="icon-badge-number">{state.cartItems.length}</span>
          ) : (
            ""
          )}
          <Link to="/cart">
            <img src={cart} alt="brand-logo" className="brand-logo" />
          </Link>
        </div>
        <div className="icon-badge-container">
          {state.wishlistItems.length > 0 && authState ? (
            <span className="icon-badge-number">
              {state.wishlistItems.length}
            </span>
          ) : (
            ""
          )}

          <Link to="/wishlist">
            <img src={wishlist} alt="brand-logo" className="brand-logo" />
          </Link>
        </div>

        <div>
          <div
            className="menu-div-container"
            style={{
              display: toogleMenu ? "block" : "none",
            }}
          >
            <div>
              {/* <a href="">Categories</a> */}
              <span onClick={categoriesDropDownHandler}>Categories</span>
              <div
                className="categories-list"
                style={{ display: toogleCategories ? "flex" : "none" }}
              >
                <a href="">Outdoor</a>
                <a href="">Indoor</a>
                <a href="">Succulents</a>
                <a href="">Hanging</a>
              </div>
            </div>
            <div>
              <a href="">Filters</a>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <img
            src={user}
            alt="brand-logo"
            className="brand-logo"
            onClick={menuHandler}
          ></img>
        </div>
      </div>
    </div>
  );
};

//
