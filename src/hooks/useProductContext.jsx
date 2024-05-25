import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContextProvider";

export const useProductContext = () => {
  return useContext(ProductContext);
};
