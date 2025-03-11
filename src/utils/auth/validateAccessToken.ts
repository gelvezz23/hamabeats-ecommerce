import { GraphQLClientSingleton } from "@/graphql";
import { customerName } from "@/graphql/queries/customerName";
import { cookies } from "next/headers";

export const validateAccessToken = async () => {
  try {
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get("accessToken")?.value || "";

    if (!accessToken) {
      return null;
    }

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

    if (!graphqlClient) {
      console.error("GraphQL client not initialized");
      return null;
    }

    const { customer } = (await graphqlClient.request(customerName, {
      customerAccessToken: accessToken,
    })) as any;

    return customer;
  } catch (error) {
    console.error("Error validating access token:", error);
    return null; // Devuelve null en caso de error.
  }
};
