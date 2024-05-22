import "./ProductDetail.css";

export const ProductDetail = () => {
  return (
    <>
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="product-image-container">
            <img
              src="https://media.greg.app/cGxhbnQtZGItcGhvdG9zL21vbnN0ZXJhXy5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000"
              alt="photo"
            />
          </div>
          <div className="product-description-container">
            <h2>Monstera</h2>
            <div className="product-pricing">
              <span className="product-currentprice">Rs:222</span>
              <span className="product-originalprice">Rs:1200</span>
              <span className="prodcut-discount">60% Off</span>
            </div>
            <span className="description-span">Descirption:</span>
            <p>
              Monstera deliciosa, commonly called split-leaf philodendron or
              swiss cheese plant, is native to Central America. It is a
              climbing, evergreen perennial vine that is perhaps most noted for
              its large perforated leaves on thick plant stems and its long
              cord-like aerial roots.
            </p>

            <div className="quantity-container">
              <strong>
                Quantity:
                <button className="cart-quantity-button">-</button>
                <input type="number" name="quantity" />
                <button className="cart-quantity-button">+</button>
              </strong>
            </div>

            <button className="product-detail-button dark-theme">
              Add to cart
            </button>
            <button className="product-detail-button light-theme">
              Add to wishList
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
//
