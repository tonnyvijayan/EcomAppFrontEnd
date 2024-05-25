import "./ProductListing.css";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductCard } from "./ProductCard";

export const ProductListing = () => {
  const { state } = useProductContext();

  return (
    <div className="productlisting-container">
      {state.products.map((item) => {
        const { name, price, imageUrl, rating } = item;
        return (
          <ProductCard
            key={name}
            title={name}
            price={price}
            imageUrl={imageUrl}
            rating={rating}
          />
        );
      })}
    </div>
  );
};
