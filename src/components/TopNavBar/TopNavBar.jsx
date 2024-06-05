import "./TopNavBar.css";
import brandLogo from "./assets/brand-logo.svg";
import wishlist from "./assets/wishlist.svg";
import cart from "./assets/cart.svg";
import user from "./assets/user.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProductContext } from "../../hooks/useProductContext";

export const TopNavBar = () => {
  const { authState } = useAuth();
  const { state } = useProductContext();
  return (
    <div className="Top-Nav-Bar-Container">
      <div className="brand-logo-container">
        <Link to="/">
          <img src={brandLogo} alt="brand-logo" className="brand-logo" />
        </Link>

        <strong>PlantMart</strong>
      </div>
      {/* {JSON.stringify(authState)} */}
      {JSON.stringify(state.wishlistItems)}

      <div className="user-detail-container">
        <Link to="/cart">
          <img src={cart} alt="brand-logo" className="brand-logo" />
        </Link>
        <Link to="/wishlist">
          <img src={wishlist} alt="brand-logo" className="brand-logo" />
        </Link>
        <Link to="/">
          <img src={user} alt="brand-logo" className="brand-logo" />
        </Link>
      </div>
    </div>
  );
};
