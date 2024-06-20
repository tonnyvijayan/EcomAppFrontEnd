import { createContext, useEffect, useReducer, useState } from "react";
import axios from "../axios/axios";

const initialState = {
  products: [],
  cartItems: [],
  wishlistItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE-LOCAL-PRODUCT-STATE-FROM-SERVER":
      return { ...state, products: action.payload };

    case "ADD-TO-CART":
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    case "REMOVE-FROM-CART":
      return { ...state, cartItems: action.payload };

    case "INCREASE-CART-ITEM-QUANTITY":
      return { ...state, cartItems: action.payload };

    case "DECREASE-CART-ITEM-QUANTITY":
      return { ...state, cartItems: action.payload };

    case "MERGE-LOCAL-CART-AND-DB-CART-ITEMS":
      return { ...state, cartItems: action.payload };

    case "UPDATE-USER-WISHLIST-FROM-SERVER":
      return { ...state, wishlistItems: action.payload };

    case "ADD-TO-WISHLIST":
      return { ...state, wishlistItems: action.payload };

    case "REMOVE-FROM-WISHLIST":
      return { ...state, wishlistItems: action.payload };

    case "USER-LOGOUT":
      return {
        ...state,
        cartItems: action.payload,
        wishlistItems: action.payload,
      };
    case "CLEAR-CART":
      return { ...state, cartItems: action.payload };
    default:
      break;
  }
};

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [toastDetails, setToastDetails] = useState({
    toastMessage: "",
    active: false,
    type: "",
  });
  //
  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const productData = await axios.get("products/fetchproducts", {
          signal: controller.signal,
        });
        console.log("fetching products", productData.data.products);
        isMounted &&
          dispatch({
            type: "UPDATE-LOCAL-PRODUCT-STATE-FROM-SERVER",
            payload: productData.data.products,
          });
        setLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log("Unable to fetch products", error.message);
        }
      }
    };
    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <ProductContext.Provider
        value={{
          state,
          dispatch,
          toastDetails,
          setToastDetails,
          loading,
          setLoading,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
};
