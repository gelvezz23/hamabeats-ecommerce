import { MainProducts } from "@/components/home/MainProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " 👾 Hamabeats | store | pixel art",
  description:
    "bienvenidos a la venta de arte en pixel art de forma artesanal para todo tipo de decoraciones o regalos",
  keywords: [
    "ecommerce",
    "hamabeats",
    "hamas",
    "pixel art",
    "arte",
    "pixels",
    "2d",
  ],
};

export default function Home() {
  return (
    <main>
      <MainProducts />
    </main>
  );
}
