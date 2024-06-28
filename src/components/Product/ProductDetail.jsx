import { useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import "./ProductDetail.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { RouteNotFound } from "../RouteNotFound/RouteNotFound";
import { useToast } from "../../hooks/useToast";

export const ProductDetail = () => {
  const { state, dispatch } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { authState } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();

  const itemsInCart = state.cartItems.map((item) => item._id);
  const [product] = state.products.filter((item) => item._id === productId);

  const addToCartHandler = async (_id) => {
    dispatch({
      type: "ADD-TO-CART",
      payload: { _id: _id, quantity: quantity },
    });
    if (authState) {
      try {
        await axiosPrivate.post("/user/addtocart", {
          productId: _id,
          quantity: quantity,
        });
      } catch (error) {
        console.log("Unable to add product to cart");
      }
    }
  };

  const addToWishlistHandler = async (_id) => {
    if (authState) {
      try {
        const response = await axiosPrivate.post("/user/addtowishlist", {
          productId: _id,
        });
        if (response.status === 201) {
          const updatedWishlist = [...state.wishlistItems, _id];

          dispatch({ type: "ADD-TO-WISHLIST", payload: updatedWishlist });
        }
      } catch (error) {
        console.log("Unable to add item to wishlist");
      }
    } else {
      navigate("/wishlist", { state: { path: location.pathname } });
      showToast("Login to add to wishlist", "fail");
    }
  };

  return (
    <>
      {product ? (
        <div className="product-detail-page">
          <div className="product-detail-container">
            <div className="product-image-container">
              <img src={product?.imageUrl} alt="photo" />
            </div>
            <div className="product-description-container">
              <h2>{product?.name}</h2>
              <div className="product-pricing">
                <span className="product-currentprice">
                  Rs:
                  {Math.trunc(
                    product?.price -
                      product?.price * (product?.maxDiscount / 100)
                  )}
                </span>
                <span className="product-originalprice">
                  Rs:{product?.price}
                </span>
                <span className="prodcut-discount">
                  {product?.maxDiscount}% Off
                </span>
              </div>
              <span className="description-span">Descirption:</span>
              <p>{product?.productDescription}</p>

              <div className="quantity-container">
                <strong>
                  Quantity:
                  <button
                    className="cart-quantity-button"
                    onClick={() => {
                      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="cart-quantity-button"
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                  >
                    +
                  </button>
                </strong>
              </div>
              {itemsInCart.includes(product?._id) ? (
                <button
                  className="product-detail-button dark-theme"
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  Item in cart
                </button>
              ) : (
                <button
                  className="product-detail-button dark-theme"
                  onClick={() => {
                    addToCartHandler(product?._id);
                  }}
                >
                  Add to cart
                </button>
              )}
              {state.wishlistItems.includes(product?._id) ? (
                <button
                  className="product-detail-button light-theme"
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  In wishlist
                </button>
              ) : (
                <button
                  className="product-detail-button light-theme"
                  onClick={() => addToWishlistHandler(product?._id)}
                >
                  Add to wishlist
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <RouteNotFound />
      )}
    </>
  );
};
//
