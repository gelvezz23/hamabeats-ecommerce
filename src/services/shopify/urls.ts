import { SHOPIFY_HOSTNAME } from "@/config/env";

export const shopifyUrls = {
  products: {
    all: `${SHOPIFY_HOSTNAME}/admin/api/2023-10/products.json`,
    mainProducts: `${SHOPIFY_HOSTNAME}/admin/api/2023-10/collections/489105490084/products.json`,
  },
  collection: {
    all: `${SHOPIFY_HOSTNAME}/admin/api/2023-10/smart_collections.json`,
    products: (id: string) =>
      `${SHOPIFY_HOSTNAME}/admin/api/2023-10/collections/${id}/products.json`,
  },
};
