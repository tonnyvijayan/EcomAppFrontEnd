import "./TopNavBar.css";
import brandLogo from "./assets/brand-logo.svg";
import wishlist from "./assets/wishlist.svg";
import cart from "./assets/cart.svg";
import user from "./assets/user.svg";
import { Link } from "react-router-dom";

export const TopNavBar = () => {
  return (
    <div className="Top-Nav-Bar-Container">
      <div className="brand-logo-container">
        <img src={brandLogo} alt="brand-logp" />
        <strong>PlantMart</strong>
      </div>

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
