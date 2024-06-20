import "./TopNavBar.css";
import brandLogo from "./assets/brand-logo.svg";
import wishlist from "./assets/wishlist.svg";
import cart from "./assets/cart.svg";
import user from "./assets/user.svg";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useToast } from "../../hooks/useToast";

export const TopNavBar = () => {
  const { state, dispatch } = useProductContext();
  const { authState, setAuthState } = useAuth();
  const [toogleMenu, setToogleMenu] = useState(false);
  const [toogleCategories, setToogleCategories] = useState(false);
  const [toogleFilters, setToogleFilters] = useState(false);
  const showToast = useToast();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortHandler = (sortType) => {
    searchParams.set("sort", sortType);
    setSearchParams(searchParams);
  };

  const filterHandler = (event) => {
    console.log(event.target.checked);
    console.log(searchParams.getAll("sort"));

    if (event.target.checked) {
      searchParams.set(event.target.name, "true");
      setSearchParams(searchParams);
    } else {
      searchParams.delete(event.target.name);
      setSearchParams(searchParams);
    }
  };

  ///////////////////////////////
  const menuHandler = () => {
    setToogleMenu((prev) => !prev);
    setToogleCategories(false);
    setToogleFilters(false);
  };

  const categoriesDropDownHandler = () => {
    setToogleCategories((prev) => !prev);
  };

  const filterDropDownHandler = () => {
    setToogleFilters((prev) => !prev);
  };

  const logOutHandler = async () => {
    try {
      await axiosPrivate.get("/user/logout");
      setAuthState("");
      dispatch({ type: "USER-LOGOUT", payload: [] });
      navigate("/");
      setToogleMenu((prev) => !prev);
      showToast("Logged Out", "success");
    } catch (error) {
      console.log("unable to logout user");
    }
  };

  console.log("sort1", searchParams);
  return (
    <div className="Top-Nav-Bar-Container">
      <div className="brand-logo-container">
        <Link to="/">
          <img src={brandLogo} alt="brand-logo" className="brand-logo" />
        </Link>

        <strong>PlantMart</strong>
      </div>

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
            <div className="filter-categories-div">
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
            {location.pathname === "/" ? (
              <div className="filter-categories-div">
                <span onClick={filterDropDownHandler}>Filters</span>
                {/*  */}

                <div
                  className="categories-list"
                  style={{ display: toogleFilters ? "flex" : "none" }}
                >
                  <div className="fieldsetDivContainerTopNav">
                    <fieldset>
                      <legend>Sort By</legend>
                      <div>
                        <input
                          type="radio"
                          id="LOW-TO-HIGH"
                          name="sortingNav"
                          onClick={() => {
                            sortHandler("LOW-TO-HIGH");
                          }}
                          checked={
                            searchParams.getAll("sort")[0] === "LOW-TO-HIGH"
                              ? true
                              : false
                          }
                          readOnly
                        />
                        <label htmlFor="LOW-TO-HIGH">Low To High</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="HIGH-TO-LOW"
                          name="sortingNav"
                          onClick={() => {
                            sortHandler("HIGH-TO-LOW");
                          }}
                          checked={
                            searchParams.getAll("sort")[0] === "HIGH-TO-LOW"
                              ? true
                              : false
                          }
                          readOnly
                        />
                        <label htmlFor="HIGH-TO-LOW">High To Low</label>
                      </div>
                    </fieldset>
                  </div>
                  <div
                    className="fieldsetDivContainerTopNav"
                    onClick={filterHandler}
                  >
                    <fieldset>
                      <legend>Filter</legend>
                      <div>
                        <input
                          type="checkbox"
                          id="Fast-Delivery"
                          name="fastDelivery"
                          checked={
                            searchParams.getAll("fastDelivery")[0] === "true"
                              ? true
                              : false
                          }
                          readOnly
                        />
                        <label htmlFor="Fast-Delivery">Fast-Delivery</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="Out-Of-Stock"
                          name="inStock"
                          checked={
                            searchParams.getAll("inStock")[0] === "true"
                              ? true
                              : false
                          }
                          readOnly
                        />
                        <label htmlFor="Out-Of-Stock">In Stock</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="New-Item"
                          name="new"
                          checked={
                            searchParams.getAll("new")[0] === "true"
                              ? true
                              : false
                          }
                          readOnly
                        />
                        <label htmlFor="New-Item">New</label>
                      </div>
                    </fieldset>
                  </div>
                  <button
                    className="topnav-reset"
                    onClick={() => {
                      setSearchParams({});
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : null}

            <div>
              {authState ? (
                <button className="logout-button" onClick={logOutHandler}>
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={menuHandler}>
                  Login
                </Link>
              )}
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
