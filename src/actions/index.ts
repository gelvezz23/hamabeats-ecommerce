"use server";

import { GraphQLClientSingleton } from "@/graphql";
import { createCartMutation } from "@/graphql/mutations/createCartMutation";
import { createUserMutation } from "@/graphql/mutations/createUserMutation";
import { createAccessToken } from "@/utils/auth/createAccessToken";
import { validateAccessToken } from "@/utils/auth/validateAccessToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleCreateUser = async (formData: any) => {
  const formDataObject = Object.fromEntries(formData);
  delete formDataObject["password_confirmation"];
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const variables = {
    input: {
      ...formDataObject,
      phone: "+57" + formDataObject.phone,
    },
  };

  const { customerCreate } = (await graphqlClient.request(
    createUserMutation,
    variables
  )) as any;

  const { customerUserErrors, customer } = customerCreate;
  if (customer?.firstName) {
    const { email, password } = formDataObject;
    await createAccessToken(email, password);
    redirect("/store");
  }
};

export const handleLogin = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  const { email, password } = formDataObject;
  const accesToken = (await createAccessToken(
    email as string,
    password as string
  )) as any;
  if (accesToken) {
    redirect("/store");
  }
};

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies();
  const accesToken = cookiesStore.get("accessToken")?.value as string;

  if (!accesToken) redirect("/login");

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const customer = await validateAccessToken();
  const variables = {
    input: {
      buyerIdentity: {
        customerAccessToken: accesToken,
        email: customer?.email,
      },
      lines: items.map((item) => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  };

  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string;
      };
    };
  } = await graphqlClient.request(createCartMutation, variables);

  return cartCreate?.cart?.checkoutUrl;
};
