import "./Wishlist.css";
import { EmptyWishlist } from "./EmptyWishlist";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useProductContext } from "../../hooks/useProductContext";

export const Wishlist = () => {
  const { authState } = useAuth();
  const { state, dispatch } = useProductContext();
  const axiosPrivate = useAxiosPrivate();
  const productsInCart = state.cartItems.map((item) => {
    return item._id;
  });
  const productsInWishlist = state.wishlistItems.map((item) => {
    const [productDetail] = state.products.filter(
      (product) => product._id === item
    );
    return { ...productDetail };
  });

  const removeFromWishlistHanlder = async (_id) => {
    try {
      const response = await axiosPrivate.post("/user/removefromwishlist", {
        productId: _id,
      });
      if (response.status === 200) {
        const updatedWishlist = state.wishlistItems.filter((item) => {
          return item !== _id;
        });
        dispatch({ type: "REMOVE-FROM-WISHLIST", payload: updatedWishlist });
      }
    } catch (error) {
      console.log("unable to remove product from wishlist");
    }
  };

  const moveToCartHandler = async (_id) => {
    if (authState) {
      try {
        const addToCartResponse = await axiosPrivate.post("/user/addtocart", {
          productId: _id,
        });
        const removeFromWishlistResponse = await axiosPrivate.post(
          "/user/removefromwishlist",
          {
            productId: _id,
          }
        );

        if (
          addToCartResponse.status === 201 &&
          removeFromWishlistResponse.status === 200
        ) {
          dispatch({
            type: "ADD-TO-CART",
            payload: { _id: _id, quantity: 1 },
          });
          const updatedWishlist = state.wishlistItems.filter((item) => {
            return item !== _id;
          });
          dispatch({ type: "REMOVE-FROM-WISHLIST", payload: updatedWishlist });
        } else {
          console.log("Item already exists in cart");
        }
      } catch (error) {
        console.log("Unable to move product to cart");
      }
    }
  };

  return (
    <>
      {productsInWishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="wishlist-container">
          {productsInWishlist?.map((item) => {
            const { _id, name, price, rating, imageUrl, maxDiscount } = item;
            return (
              <div className="wishlist-card" key={_id}>
                <a to={`/productdetail/`}>
                  <img
                    className="card-image-responsive"
                    src={imageUrl}
                    alt="image"
                  />
                </a>

                <h3 className="card-heading">{name}</h3>
                <div className="card-pricing">
                  <span className="card-product-currentprice">
                    Rs:{Math.trunc(price - price * (maxDiscount / 100))}
                  </span>
                  <span className="card-product-originalprice">Rs:{price}</span>
                  <span className="card-prodcut-discount">
                    {maxDiscount}% Off
                  </span>
                </div>

                <div className="card-rating">
                  <span className="rating-badge">{rating} ★</span>
                </div>

                <div className="product-detail-bottom-container">
                  <span>Fast Delivery</span>
                  <span>In Stock</span>
                </div>

                <div className="wishlist-button-container">
                  {productsInCart.includes(_id) ? (
                    <button
                      className="button-primary-one dark-theme"
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                    >
                      Item in Cart
                    </button>
                  ) : (
                    <button
                      className="button-primary-one dark-theme"
                      onClick={() => {
                        moveToCartHandler(_id);
                      }}
                    >
                      Move to Cart
                    </button>
                  )}

                  <button
                    onClick={() => {
                      removeFromWishlistHanlder(_id);
                    }}
                    className="button-primary-one light-theme"
                  >
                    Remove From Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
