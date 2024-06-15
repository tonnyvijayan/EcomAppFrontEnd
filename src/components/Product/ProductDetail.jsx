import { useState } from "react";
import { useProductContext } from "../../hooks/useProductContext";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export const ProductDetail = () => {
  const { state, dispatch } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { authState } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const itemsInCart = state.cartItems.map((item) => item._id);

  const [{ name, price, maxDiscount, imageUrl, productDescription, _id }] =
    state?.products.filter((item) => item._id === productId) || [];

  const addToCartHandler = async (_id) => {
    console.log("product id is", productId);
    dispatch({
      type: "ADD-TO-CART",
      payload: { _id: _id, quantity: quantity },
    });
    if (authState) {
      try {
        const response = await axiosPrivate.post("/user/addtocart", {
          productId: _id,
          quantity: quantity,
        });
        if (response.status === 201) {
          console.log("Item added to cart");
        } else {
          console.log("Item already exists in cart");
        }
      } catch (error) {
        console.log("Unable to add product to cart");
      }
    }
  };

  const addToWishlistHandler = async (_id) => {
    console.log(_id);
    if (authState) {
      try {
        const response = await axiosPrivate.post("/user/addtowishlist", {
          productId: _id,
        });
        if (response.status === 201) {
          const updatedWishlist = [...state.wishlistItems, _id];
          console.log("from add to wishlist", updatedWishlist);
          dispatch({ type: "ADD-TO-WISHLIST", payload: updatedWishlist });
        }
      } catch (error) {
        console.log("Unable to add item to wishlist");
      }
    } else {
      navigate("/wishlist");
      //show toast to login to add to wishlist
    }
  };

  return (
    <>
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="product-image-container">
            <img src={imageUrl} alt="photo" />
          </div>
          <div className="product-description-container">
            <h2>{name}</h2>
            <div className="product-pricing">
              <span className="product-currentprice">
                Rs:{Math.trunc(price - price * (maxDiscount / 100))}
              </span>
              <span className="product-originalprice">Rs:{price}</span>
              <span className="prodcut-discount">{maxDiscount}% Off</span>
            </div>
            <span className="description-span">Descirption:</span>
            <p>{productDescription}</p>

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
            {itemsInCart.includes(_id) ? (
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
                  addToCartHandler(_id);
                }}
              >
                Add to cart
              </button>
            )}
            {state.wishlistItems.includes(_id) ? (
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
                onClick={() => addToWishlistHandler(_id)}
              >
                Add to wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
//
