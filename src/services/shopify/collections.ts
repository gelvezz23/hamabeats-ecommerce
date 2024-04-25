import { SHOPIFY_TOKEN } from "@/config/env";
import { shopifyUrls } from "./urls";

export const getCollections = async () => {
  try {
    const response = await fetch(shopifyUrls.collection.all, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_TOKEN,
      },
    });
    const { smart_collections } = await response.json();
    const transformCollections = smart_collections.map(
      (collection: { id: any; title: any; image: any; handle: any }) => {
        return {
          id: collection.id,
          title: collection.title,
          image: collection.image,
          handle: collection.handle,
        };
      }
    );
    return transformCollections;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionProducts = async (id: string) => {
  try {
    const response = await fetch(shopifyUrls.collection.products(id), {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_TOKEN,
      },
    });

    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};
