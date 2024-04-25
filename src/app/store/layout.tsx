import { getCollections } from "@/services/shopify/collections";
import Link from "next/link";
import { FC, Key, ReactNode } from "react";
import styles from "./StoreLayout.module.scss";
import { ChatLink } from "@/components/Store/ChatLink";

export const runtime = "edge";

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  const collections = await getCollections();

  return (
    <main className={styles.StoreLayout}>
      <h1>Explore</h1>
      <nav>
        <ul className={styles.StoreLayout__list}>
          {collections.map(
            (collection: {
              id: Key | number | undefined;
              handle: string;
              title: string;
            }) => (
              <Link
                key={collection.id}
                href={"/store/" + collection.handle}
                className={styles.StoreLayout__chip}
              >
                {collection.title}
              </Link>
            )
          )}
        </ul>
        <ChatLink />
      </nav>
      {children}
    </main>
  );
};

export default Layout;
