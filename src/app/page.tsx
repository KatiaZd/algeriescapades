// src/app/page.tsx
import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.hero}>
      <Image
        src="/assets/img/img-homePage.jpg"
        alt="Beautiful view of Algeria"
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles.heroImage}
      />
      <div className={styles.overlay}>
        <h1 className={styles.title}>Escapades en Algérie</h1>
        <h2>Découvrez l'Algérie autrement avec Algeriescapades : votre porte d'entrée vers des aventure inoubliables</h2>
        <button className={styles.cta}>Explorez Maintenant</button>
      </div>
    </div>
  );
}
