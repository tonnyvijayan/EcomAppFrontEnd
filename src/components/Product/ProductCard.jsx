import { useProductContext } from "../../hooks/useProductContext";
import "./ProductCard.css";

export const ProductCard = ({ productId, title, price, imageUrl, rating }) => {
  const { state, dispatch } = useProductContext();

  const itemsInCart = state.cartItems.map((item) => item._id);
  const addToCartHandler = (productId) => {
    dispatch({
      type: "ADD-TO-CART",
      payload: { _id: productId, quantity: 1 },
    });
    console.log(productId);
  };
  //
  return (
    <>
      <div className="card">
        <a to={`/productdetail/`}>
          <img className="card-image-responsive" src={imageUrl} alt="image" />
        </a>
        <h3 className="card-heading">{title}</h3>
        <div className="card-pricing">
          <span className="card-product-currentprice">Rs:222</span>
          <span className="card-product-originalprice">{price}</span>
          <span className="card-prodcut-discount">60% Off</span>
        </div>
        <div className="card-rating">
          <span className="rating-badge">{rating} ★</span>
        </div>
        <span className="material-icons  like-location">favorite_border</span>
        <div className="product-detail-bottom-container">
          <span>Fast Delivery</span>
          <span>In Stock</span>
        </div>
        {/*  */}
        <div className="card-button-container">
          {itemsInCart.includes(productId) ? (
            <button className="card-button-secondary" disabled={true}>
              Item in Cart
            </button>
          ) : (
            <button
              onClick={() => {
                addToCartHandler(productId);
              }}
              className="card-button-primary"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};
