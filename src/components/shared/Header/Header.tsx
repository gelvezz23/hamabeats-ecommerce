import Link from "next/link";
import styles from "./Header.module.scss";
import { validateAccessToken } from "@/utils/auth/validateAccessToken";
import dynamic from "next/dynamic";

export const Header = async () => {
  const NoSSRShoppingcart = dynamic(() => import("../ShoppingCart"), {
    ssr: false,
  });

  const { firstName }: { firstName: string } =
    (await validateAccessToken()) || {};
  return (
    <header className={styles.Header}>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Store</Link>
          </li>
          <li>{!firstName && <Link href="/signup">sign up</Link>}</li>
        </ul>
      </nav>
      <div className={styles.Header__user}>
        {firstName ? (
          <Link href="/my-account">Hola! {firstName}</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <NoSSRShoppingcart />
      </div>
    </header>
  );
};
