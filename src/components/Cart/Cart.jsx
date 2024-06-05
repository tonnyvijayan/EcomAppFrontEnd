import "./Cart.css";
import axios from "../../axios/axios";

import { useProductContext } from "../../hooks/useProductContext";
import { EmptyCart } from "./EmptyCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
//
export const Cart = () => {
  const { state, dispatch } = useProductContext();
  const { authState } = useAuth();
  const navigate = useNavigate();

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
        const response = await axios.post("/user/removefromcart", {
          productId: _id,
        });
        if (response.status === 200) {
          console.log("Product removed from cart");
        }
      } catch (error) {
        console.log("Unable to remove item from cart");
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
        const response = await axios.post("/user/increaseitemquantity", {
          productId: _id,
        });
        if (response.status === 201) {
          console.log("Item quantity increased");
        }
      } catch (error) {
        console.log("Unable to increase item quantity");
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
        const response = await axios.post("/user/decreaseitemquantity", {
          productId: _id,
        });
        if (response.status === 201) {
          console.log("Item quantity decreased");
        }
      } catch (error) {
        console.log("unable to decrease item quantity");
      }
    }
  };

  const moveToWishlistHandler = async (_id) => {
    if (authState) {
      try {
        const moveToWishlistResponse = await axios.post("/user/addtowishlist", {
          productId: _id,
        });
        const removeFromCartResponse = await axios.post(
          "/user/removefromcart",
          {
            productId: _id,
          }
        );

        console.log({ moveToWishlistResponse, removeFromCartResponse });
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
        console.log("Unable to move item to wishlist", error);
      }
    } else {
      navigate("/wishlist");
      //show toast to login to add to wishlist
    }
  };

  // useEffect(() => {
  //   console.log("cart use effect");
  //   const fetchCartItems = async () => {
  //     const cartData = await axios.get("/user/fetchcart");

  //     console.log(cartData);
  //   };

  //   if (authState) {
  //     console.log("fetching cart items");
  //     fetchCartItems();
  //   }
  // }, [authState]);

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
                const { _id, name, price, imageUrl } = item._id;
                return (
                  <tr key={_id}>
                    <td>
                      <div className="cart-info-container">
                        <img src={imageUrl} />
                        <div className="cart-item-description">
                          <h3>{name}</h3>
                          <small>Price {price}</small>
                          <div className="cart-button-div">
                            <button
                              className="button-primary-cartlist"
                              onClick={() => {
                                moveToWishlistHandler(_id);
                              }}
                            >
                              To Wishlist
                            </button>

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
                    <td>Rs.{item.quantity * price}</td>
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
            <button className="button-primary-cartlist mg-top">Confirm</button>
          </div>
        </div>
      )}
    </>
  );
};
