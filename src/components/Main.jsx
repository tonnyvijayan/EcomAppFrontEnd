import "./Main.css";
//
import { Routes, Route } from "react-router-dom";
import { ProductListing } from "./Product/ProductListing";
import { ProductDetail } from "./Product/ProductDetail";
import { Login } from "./Login/Login";
import { Cart } from "./Cart/Cart";
import { SignUp } from "./Signup/SignUp";
import { Wishlist } from "./Wishlist/Wishlist";
import { PrivateRoute } from "./PrivateRotue/PrivateRoute";

export const Main = () => {
  return (
    <>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
