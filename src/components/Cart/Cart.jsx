import { useProductContext } from "../../hooks/useProductContext";
import "./Cart.css";
import { EmptyCart } from "./EmptyCart";
//
export const Cart = () => {
  const { state, dispatch } = useProductContext();

  const productsInCart = state.cartItems.map((item) => {
    const [productDetails] = state.products.filter((product) => {
      return product._id === item._id;
    });

    return { ...item, _id: productDetails };
  });

  const cartTotal = productsInCart.reduce((total, item) => {
    return total + item._id.price * item.quantity;
  }, 0);

  const removeFromCartHandler = (_id) => {
    const updatedCart = state.cartItems.filter((item) => item._id !== _id);

    dispatch({
      type: "REMOVE-FROM-CART",
      payload: updatedCart,
    });
  };

  const increacseItemQuantityHandler = (_id) => {
    const updatedCart = state.cartItems.map((item) => {
      return item._id === _id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    dispatch({ type: "INCREASE-CART-ITEM-QUANTITY", payload: updatedCart });
  };

  const decreacseItemQuantityHandler = (_id) => {
    const updatedCart = state.cartItems.map((item) => {
      return item._id === _id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });

    // console.log(updatedCart);
    dispatch({ type: "DECREASE-CART-ITEM-QUANTITY", payload: updatedCart });
  };

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
