import { ProductTypes } from "@/components/home/MainProducts/types";
import { ProductCard } from "../ProductCard";
import styles from "./ProductsWrapper.module.scss";

interface ProductsWrapperProps {
  products: ProductTypes[];
}

export const ProductsWrapper = ({ products }: ProductsWrapperProps) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
