import "./ProductListing.css";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductCard } from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";
//
export const ProductListing = () => {
  const { state, loading } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const sortedAndFilteredProducts = sortAndFilterProducts()
    .filter((item) => {
      return searchParams.getAll("inStock").length > 0 &&
        searchParams.getAll("inStock")[0] === "true"
        ? item.inStock === true
        : item;
    })
    .filter((item) => {
      return searchParams.getAll("fastDelivery").length > 0 &&
        searchParams.getAll("fastDelivery")[0] === "true"
        ? item.deliveryTime === "fast"
        : item;
    })
    .filter((item) => {
      return searchParams.getAll("new").length > 0 &&
        searchParams.getAll("new")[0] === "true"
        ? item.new === true
        : item;
    });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="productlisting-container">
          {/* {JSON.stringify(searchParams.getAll("sort"))} */}
          {sortedAndFilteredProducts?.map((item) => {
            const {
              _id,
              name,
              price,
              imageUrl,
              rating,
              maxDiscount,
              inStock,
              deliveryTime,
            } = item;
            return (
              <ProductCard
                _id={_id}
                key={_id}
                title={name}
                price={price}
                imageUrl={imageUrl}
                rating={rating}
                discount={maxDiscount}
                inStock={inStock}
                deliveryTime={deliveryTime}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
