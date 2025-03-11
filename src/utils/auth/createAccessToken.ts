import { GraphQLClientSingleton } from "@/graphql";
import { customerAccessTokenCreateMutation } from "@/graphql/mutations/customerAccessTokenCreate";
import { cookies } from "next/headers";

export const createAccessToken = async (email: string, password: string) => {
  const cookiesStore = cookies();
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  console.log("GGG", graphqlClient);
  const { customerAccessTokenCreate } = (await graphqlClient.request(
    customerAccessTokenCreateMutation,
    {
      email,
      password,
    }
  )) as any;
  const { accessToken, expiresAt } =
    customerAccessTokenCreate?.customerAccessToken;

  console.log({ accessToken, expiresAt });
  if (accessToken) {
    cookiesStore.set("accessToken", accessToken, {
      path: "/",
      expires: new Date(expiresAt),
      httpOnly: true,
      sameSite: "strict",
    });

    return accessToken;
  }
};
