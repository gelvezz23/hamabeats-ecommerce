import React from "react";
import styles from "./Description.module.scss";
import Image from "next/image";
export const Description = () => {
  return (
    <section className={styles.description}>
      <div className={styles.description__imageContainer}>
        <Image
          src="/images/logo_hamabeats.png"
          alt="hamabeats"
          fill
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,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"
        />
      </div>
      <div className={styles.description__text}>
        <h2>Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sequi
          asperiores culpa cum velit eos obcaecati voluptates ipsa. Inventore
          fugiat, dignissimos totam nulla aperiam sed reprehenderit cupiditate
          alias magni enim!
        </p>
      </div>
    </section>
  );
};
