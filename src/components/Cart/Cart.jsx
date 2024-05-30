import { useProductContext } from "../../hooks/useProductContext";
import "./Cart.css";
import { EmptyCart } from "./EmptyCart";
//
export const Cart = () => {
  const { state } = useProductContext();

  const productsInCart = state.cartItems.map((item) => {
    const [productDetails] = state.products.filter((product) => {
      return product._id === item._id;
    });
    console.log(productDetails);
    return { ...item, _id: productDetails };
  });
  const cartTotal = productsInCart.reduce(
    (total, item) => total + item._id.price,
    0
  );
  console.log(productsInCart.length);
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
                  <>
                    <tr key={_id}>
                      <td>
                        <div className="cart-info-container">
                          <img src={imageUrl} />
                          <div className="cart-item-description">
                            <h3>{name}</h3>
                            <small>Price {price}</small>
                            <div className="cart-button-div">
                              <button className="button-primary-cartlist">
                                To Wishlist
                              </button>

                              <button className="button-secondary-cartlist">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="quantity-container">
                          <button>+</button>
                          <span>{item.quantity}</span>
                          <button>-</button>
                        </div>
                      </td>
                      <td>Rs.{item.quantity * price}</td>
                    </tr>
                  </>
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
