import "./Cart.css";

export function Cart() {
  return (
    <div className="cart-page-container">
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>

        <tr>
          <td>
            <div className="cart-info-container">
              <img src="https://media.greg.app/cGxhbnQtZGItcGhvdG9zL21vbnN0ZXJhXy5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000" />
              <div className="cart-item-description">
                <h3>Monstera</h3>
                <small>Price 300</small>
                <div className="cart-button-div">
                  <button className="button-primary-cartlist">
                    To Wishlist
                  </button>

                  <button className="button-secondary-cartlist">Remove</button>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="quantity-container">
              <button>+</button>
              <span>1</span>
              <button>-</button>
            </div>
          </td>
          <td>Rs.1200</td>
        </tr>
        {/*  */}

        <tr>
          <td>
            <div className="cart-info-container">
              <img src="https://media.greg.app/cGxhbnQtZGItcGhvdG9zL21vbnN0ZXJhXy5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000" />
              <div className="cart-item-description">
                <h3>Monstera</h3>
                <small>Price 300</small>
                <div className="cart-button-div">
                  <button className="button-primary-cartlist">
                    To Wishlist
                  </button>

                  <button className="button-secondary-cartlist">Remove</button>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="quantity-container">
              <button>+</button>
              <span>1</span>
              <button>-</button>
            </div>
          </td>
          <td>Rs.1200</td>
        </tr>
        {/*  */}
      </table>

      <div className="total-price-div">
        <table>
          <tr>
            <td>SubTotal</td>
            <td>Rs:44</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>Rs:150</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>Rs:1500</td>
          </tr>
        </table>
      </div>

      <div className="confirm-button-container">
        <button className="button-primary-cartlist mg-top">Confirm</button>
      </div>
    </div>
  );
}
