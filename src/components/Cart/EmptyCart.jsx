import "./EmptyCart.css";
import { Link } from "react-router-dom";
export const EmptyCart = () => {
  return (
    <>
      <div className="emptycart-container">
        <div className="emptycart-header-container">Cart is empty</div>
        <Link to="/">Add Products</Link>
      </div>
    </>
  );
};
