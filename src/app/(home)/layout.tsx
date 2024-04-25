import { Description } from "@/components/home/Description";
import { Hero } from "@/components/home/Hero";
import { FC } from "react";
const HomeLayout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Hero />
      <Description />
      {children}
    </>
  );
};

export default HomeLayout;
