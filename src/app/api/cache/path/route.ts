import { CACHE_TOKEN } from "@/config/env";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { path, token } = body;

  if (!path || !token) {
    return Response.json({ erro: "Missing path or token" }, { status: 400 });
  }

  if (token !== CACHE_TOKEN) {
    return Response.json({ erro: "Invalid token" }, { status: 401 });
  }

  revalidatePath(path);

  return Response.json({ success: true });
};
