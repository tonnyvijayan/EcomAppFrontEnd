import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProductContext } from "../../hooks/useProductContext";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useToast } from "../../hooks/useToast";

export const ProductCard = ({
  _id,
  title,
  price,
  imageUrl,
  rating,
  discount,
  inStock,
  deliveryTime,
}) => {
  const { state, dispatch } = useProductContext();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const showToast = useToast();

  const itemsInCart = state.cartItems.map((item) => item._id);

  const addToCartHandler = async (_id) => {
    dispatch({
      type: "ADD-TO-CART",
      payload: { _id: _id, quantity: 1 },
    });
    if (authState) {
      try {
        const response = await axiosPrivate.post("/user/addtocart", {
          productId: _id,
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
      showToast("Login to add to wishlist", "fail");
    }
  };

  const removeFromWishlistHandler = async (_id) => {
    try {
      const response = await axiosPrivate.post("/user/removefromwishlist", {
        productId: _id,
      });
      console.log(response);
      if (response.status === 200) {
        const updatedWishlist = state.wishlistItems.filter((item) => {
          return item !== _id;
        });
        console.log("remove from wishlist", updatedWishlist);
        dispatch({ type: "REMOVE-FROM-WISHLIST", payload: updatedWishlist });
      }
    } catch (error) {
      console.log("unable to remove product from wishlist");
    }
  };
  //
  return (
    <div className="card" key={_id}>
      <Link to={`/${_id}`}>
        <img className="card-image-responsive" src={imageUrl} alt="image" />
      </Link>
      <h3 className="card-heading">{title}</h3>
      <div className="card-pricing">
        <span className="card-product-currentprice">
          Rs:{`${Math.trunc(price - price * (discount / 100))}`}
        </span>
        <span className="card-product-originalprice">{price}</span>
        <span className="card-prodcut-discount">{discount}% Off</span>
      </div>
      <div className="card-rating">
        <span className="rating-badge">{rating} ★</span>
      </div>
      {/*  */}
      {state.wishlistItems?.includes(_id) ? (
        <span
          className="material-icons  like-location"
          onClick={() => {
            removeFromWishlistHandler(_id);
          }}
        >
          favorite
        </span>
      ) : (
        <span
          className="material-icons  like-location"
          onClick={() => {
            addToWishlistHandler(_id);
          }}
        >
          favorite_border
        </span>
      )}

      <div className="product-detail-bottom-container">
        {deliveryTime === "standard" ? (
          <span>Standard Delivery</span>
        ) : (
          <span>Fast Delivery</span>
        )}
        {inStock ? <span>In Stock</span> : <span>Out of Stock</span>}
      </div>
      {/*  */}
      <div className="card-button-container">
        {itemsInCart.includes(_id) ? (
          <button className="card-button-secondary" disabled={true}>
            Item in Cart
          </button>
        ) : (
          <button
            onClick={() => {
              addToCartHandler(_id);
            }}
            className="card-button-primary"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
