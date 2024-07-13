import "./EmptyWishlist.css";
import { Link } from "react-router-dom";
export const EmptyWishlist = () => {
  return (
    <>
      <div className="emptywishlist-container">
        <div className="emptywishlist-header-container">Wishlist is empty</div>
        <Link to="/">Add Products</Link>
      </div>
    </>
  );
};
