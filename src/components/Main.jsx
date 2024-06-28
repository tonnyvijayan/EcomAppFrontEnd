import "./Main.css";
import { Routes, Route } from "react-router-dom";
import { ProductListing } from "./Product/ProductListing";
import { ProductDetail } from "./Product/ProductDetail";
import { Login } from "./Login/Login";
import { Cart } from "./Cart/Cart";
import { SignUp } from "./Signup/SignUp";
import { Wishlist } from "./Wishlist/Wishlist";
import { PrivateRoute } from "./PrivateRotue/PrivateRoute";
import { Toast } from "./Toast/Toast";
import { Category } from "./Category/Category";
import { PersistRoute } from "./PersistRoute/PersistRoute";
import { RouteNotFound } from "./RouteNotFound/RouteNotFound";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useReloadData } from "../hooks/useReloadData";

export const Main = () => {
  const reloadUserData = useReloadData();
  const { authState, persist } = useAuth();

  useEffect(() => {
    persist && reloadUserData();
  }, [authState]);

  return (
    <>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="productdetail/:productId" element={<ProductDetail />} />
          <Route path="/categories/:categoryId" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />

          <Route element={<PersistRoute />}>
            <Route element={<PrivateRoute />}>
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>
          </Route>

          <Route path="*" element={<RouteNotFound />} />
        </Routes>
        <Toast />
      </div>
    </>
  );
};
