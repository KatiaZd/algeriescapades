/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/notFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/assets/img/404.png"
          alt="Page 404"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.message}>La page que vous cherchez n'existe pas</p>
        <Link href="/" legacyBehavior>
          <a className={styles.button}>Voir les escapades</a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
