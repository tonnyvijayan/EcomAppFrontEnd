import "./ProductListing.css";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductCard } from "./ProductCard";
import { useSearchParams } from "react-router-dom";

export const ProductListing = () => {
  const { state } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  console.log("before sorting", state.products);

  const sortAndFilterProducts = () => {
    if (
      searchParams.getAll("sort").length > 0 &&
      searchParams.getAll("sort")[0] === "HIGH-TO-LOW"
    ) {
      const sortedProducts = [...state.products].sort((a, b) => {
        return (
          Math.trunc(b.price - b.price * (b.maxDiscount / 100)) -
          Math.trunc(a.price - a.price * (a.maxDiscount / 100))
        );
      });
      return sortedProducts;
    } else if (
      searchParams.getAll("sort").length > 0 &&
      searchParams.getAll("sort")[0] === "LOW-TO-HIGH"
    ) {
      const sortedProducts = [...state.products].sort((a, b) => {
        return (
          Math.trunc(a.price - a.price * (a.maxDiscount / 100)) -
          Math.trunc(b.price - b.price * (b.maxDiscount / 100))
        );
      });
      return sortedProducts;
    } else {
      return state.products;
    }
  };

  const sortedAndFilteredProducts = sortAndFilterProducts();

  console.log("after sorting", state.products);

  console.log({ sortedAndFilteredProducts });
  return (
    <div className="productlisting-container">
      {/* {JSON.stringify(searchParams.getAll("sort"))} */}
      {sortedAndFilteredProducts?.map((item) => {
        const { _id, name, price, imageUrl, rating, maxDiscount } = item;
        return (
          <ProductCard
            _id={_id}
            key={_id}
            title={name}
            price={price}
            imageUrl={imageUrl}
            rating={rating}
            discount={maxDiscount}
          />
        );
      })}
    </div>
  );
};
