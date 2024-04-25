import {
  SHOPIFY_GRAPHQL_ENDPOINT,
  SHOPIFY_STOREFRONT_TOKEN,
} from "@/config/env";
import { GraphQLClient } from "graphql-request";
export class GraphQLClientSingleton {
  private readonly endpoint: string = SHOPIFY_GRAPHQL_ENDPOINT;

  private static instance: GraphQLClientSingleton;

  static getInstance(): GraphQLClientSingleton {
    if (!this.instance) {
      this.instance = new GraphQLClientSingleton();
    }
    return this.instance;
  }

  getClient(): GraphQLClient {
    return new GraphQLClient(this.endpoint, {
      headers: {
        "Shopify-Storefront-Private-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
    });
  }
}
