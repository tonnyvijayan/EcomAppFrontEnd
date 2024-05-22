import "./ProductCard.css";

export const ProductCard = () => {
  return (
    <>
      <div className="card">
        <a to={`/productdetail/`}>
          <img
            className="card-image-responsive"
            src="https://media.greg.app/cGxhbnQtZGItcGhvdG9zL21vbnN0ZXJhXy5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000"
            alt="image"
          />
        </a>

        <h3 className="card-heading">Monstera</h3>
        <div className="card-pricing">
          <span className="card-product-currentprice">Rs:222</span>
          <span className="card-product-originalprice">Rs:1200</span>
          <span className="card-prodcut-discount">60% Off</span>
        </div>

        <div className="card-rating">
          <span className="rating-badge">4.3 ★</span>
        </div>

        <span className="material-icons  like-location">favorite_border</span>

        <div className="product-detail-bottom-container">
          <span>Fast Delivery</span>
          <span>In Stock</span>
        </div>

        <div className="card-button-container">
          <button className="button-primary-one">Add to Cart</button>
        </div>
      </div>
    </>
  );
};
