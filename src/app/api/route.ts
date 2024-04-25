import { getProducts } from "@/services/shopify/products";

export const GET = async () => {
  const products = await getProducts();

  return Response.json({ products });
};
