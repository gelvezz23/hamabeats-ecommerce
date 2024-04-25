import { CACHE_TOKEN } from "@/config/env";
import { revalidateTag } from "next/cache";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { tag, token } = body;

  if (!tag || !token) {
    return Response.json({ erro: "Missing tag or token" }, { status: 400 });
  }

  if (token !== CACHE_TOKEN) {
    return Response.json({ erro: "Invalid token" }, { status: 401 });
  }

  revalidateTag(tag);

  return Response.json({ success: true });
};
