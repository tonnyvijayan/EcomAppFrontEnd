import "./Cart.css";
// import axios from "../../axios/axios";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useProductContext } from "../../hooks/useProductContext";
import { EmptyCart } from "./EmptyCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
//
export const Cart = () => {
  const { state, dispatch } = useProductContext();
  const [showModal, setShowModal] = useState(false);
  const { authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const showToast = useToast();

  const productsInCart = state.cartItems.map((item) => {
    const [productDetails] = state.products.filter((product) => {
      return product._id === item._id;
    });

    return { ...item, _id: productDetails };
  });

  const cartTotal = productsInCart.reduce((total, item) => {
    return total + item._id.price * item.quantity;
  }, 0);

  const removeFromCartHandler = async (_id) => {
    const updatedCart = state.cartItems.filter((item) => item._id !== _id);

    dispatch({
      type: "REMOVE-FROM-CART",
      payload: updatedCart,
    });

    if (authState) {
      try {
        await axiosPrivate.post("/user/removefromcart", {
          productId: _id,
        });
      } catch (error) {
        showToast("Unable to remove item from cart", "fail");
      }
    }
  };

  const increacseItemQuantityHandler = async (_id) => {
    const updatedCart = state.cartItems.map((item) => {
      return item._id === _id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    dispatch({ type: "INCREASE-CART-ITEM-QUANTITY", payload: updatedCart });

    if (authState) {
      try {
        await axiosPrivate.post("/user/increaseitemquantity", {
          productId: _id,
        });
      } catch (error) {
        showToast("Unable to increase item quantity", "fail");
      }
    }
  };

  const decreacseItemQuantityHandler = async (_id) => {
    const updatedCart = state.cartItems.map((item) => {
      return item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });

    dispatch({ type: "DECREASE-CART-ITEM-QUANTITY", payload: updatedCart });
    if (authState) {
      try {
        await axiosPrivate.post("/user/decreaseitemquantity", {
          productId: _id,
        });
      } catch (error) {
        showToast("Unable to decrease item quantity", "fail");
      }
    }
  };

  const moveToWishlistHandler = async (_id) => {
    if (authState) {
      try {
        const moveToWishlistResponse = await axiosPrivate.post(
          "/user/addtowishlist",
          {
            productId: _id,
          }
        );
        const removeFromCartResponse = await axiosPrivate.post(
          "/user/removefromcart",
          {
            productId: _id,
          }
        );

        if (
          moveToWishlistResponse.status === 201 &&
          removeFromCartResponse.status === 200
        ) {
          const updatedWishlist = [...state.wishlistItems, _id];
          const updatedCart = state.cartItems.filter(
            (item) => item._id !== _id
          );

          dispatch({ type: "ADD-TO-WISHLIST", payload: updatedWishlist });

          dispatch({ type: "REMOVE-FROM-CART", payload: updatedCart });
        }
      } catch (error) {
        showToast("Unable to move item to wishlist", "fail");
      }
    } else {
      navigate("/wishlist");
      showToast("Login to add to wishlist", "fail");
    }
  };

  const confirmOrderHandler = () => {
    setShowModal(true);
  };

  const placeOrderHandler = async () => {
    try {
      const respone = await axiosPrivate.post("/user/placeorder");
      if (respone.status === 201) {
        dispatch({ type: "CLEAR-CART", payload: [] });
      }
      navigate("/");
      showToast("Order is being processed", "success");
    } catch (error) {
      showToast("Unable to process order", "fail");
    }
  };

  return (
    <>
      {productsInCart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart-page-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {productsInCart.map((item) => {
                const { _id, name, price, imageUrl, maxDiscount } = item._id;
                return (
                  <tr key={_id}>
                    <td>
                      <div className="cart-info-container">
                        <img src={imageUrl} />
                        <div className="cart-item-description">
                          <h3>{name}</h3>
                          <small>
                            Price
                            {`${Math.trunc(
                              price - price * (maxDiscount / 100)
                            )}`}
                          </small>
                          <div className="cart-button-div">
                            {state.wishlistItems.includes(_id) ? (
                              <button
                                className="button-primary-cartlist"
                                style={{ cursor: "not-allowed" }}
                                disabled={true}
                              >
                                In Wishlist
                              </button>
                            ) : (
                              <button
                                className="button-primary-cartlist"
                                onClick={() => {
                                  moveToWishlistHandler(_id);
                                }}
                              >
                                To Wishlist
                              </button>
                            )}

                            {/* <button
                              className="button-primary-cartlist"
                              onClick={() => {
                                moveToWishlistHandler(_id);
                              }}
                            >
                              To Wishlist
                            </button> */}

                            <button
                              onClick={() => removeFromCartHandler(_id)}
                              className="button-secondary-cartlist"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="quantity-container">
                        <button
                          onClick={() => increacseItemQuantityHandler(_id)}
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => decreacseItemQuantityHandler(_id)}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>
                      Rs.
                      {item.quantity *
                        Math.trunc(price - price * (maxDiscount / 100))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="total-price-div">
            <table>
              <tfoot>
                <tr>
                  <td>SubTotal</td>
                  <td>Rs:{cartTotal}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>Rs:{Math.trunc(0.18 * cartTotal)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>Rs:{Math.trunc(0.18 * cartTotal + cartTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="confirm-button-container">
            <button
              className="button-primary-cartlist mg-top"
              onClick={confirmOrderHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setShowModal(false);
        }}
        className={`cart-page-order-modal ${showModal ? "show" : ""}`}
      >
        <div className="modal-detail">
          {authState ? (
            <div className="cart-modal-details">
              <strong>{`${state.cartItems.length} ${
                state.cartItems.length > 1 ? "items" : "item"
              } totalling Rs:${Math.trunc(
                0.18 * cartTotal + cartTotal
              )}`}</strong>
              <button onClick={placeOrderHandler}>Place Order</button>
            </div>
          ) : (
            <div className="cart-modal-details">
              <strong>Log in to place your order</strong>
              <button
                onClick={() => {
                  navigate("/login", { state: { path: location.pathname } });
                }}
              >
                login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
