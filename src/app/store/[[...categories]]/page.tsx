import { ProductsWrapper } from "@/components/Store/ProductsWrapper";
import {
  getCollectionProducts,
  getCollections,
} from "@/services/shopify/collections";
import { getProducts } from "@/services/shopify/products";
import { FC } from "react";

interface CategoryProps {
  params: { categories: string[] };
  searchParams?: {};
}

const Category: FC<CategoryProps> = async ({ params }) => {
  const { categories } = params;
  let products = [];
  const collections = await getCollections();

  if (categories?.length > 0) {
    const selectedCollectionId = collections.find(
      (collection: { handle: string }) => collection.handle === categories[0]
    ).id;
    products = await getCollectionProducts(selectedCollectionId);
  } else {
    products = (await getProducts()) || [];
  }

  return <ProductsWrapper products={products} />;
};

export default Category;
