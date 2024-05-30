import "./ProductListing.css";
import { useProductContext } from "../../hooks/useProductContext";
import { ProductCard } from "./ProductCard";

export const ProductListing = () => {
  const { state } = useProductContext();

  return (
    <div className="productlisting-container">
      {state.products.map((item) => {
        const { _id, name, price, imageUrl, rating } = item;
        return (
          <ProductCard
            productId={_id}
            key={_id}
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
