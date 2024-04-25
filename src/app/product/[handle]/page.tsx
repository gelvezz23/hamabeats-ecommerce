//import { useParams, useSearchParams } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProducts } from "@/services/shopify/products";
import { redirect } from "next/navigation";
import { FC } from "react";

interface ProductPage {
  params?: { handle: string };
  searchParams: { id: string };
}

export const generateMetadata = async ({ searchParams }: ProductPage) => {
  const id = searchParams.id;
  const products = (await getProducts(id)) || [];
  const product = products[0];

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image],
    },
  };
};

const productPage: FC<ProductPage> = async ({ searchParams, params }) => {
  const id = searchParams.id;
  const products = (await getProducts(id)) || [];
  const product = products[0];

  if (!id) {
    redirect("/store");
  }
  return <ProductView product={product} />;
};

export default productPage;
