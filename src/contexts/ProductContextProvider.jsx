import { createContext, useReducer } from "react";
import { productData } from "./ProductData";

const initialState = {
  products: productData,
};

const reducer = (state, action) => {};

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <ProductContext.Provider value={{ state, dispatch }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};
