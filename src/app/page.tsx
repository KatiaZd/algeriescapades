/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
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
          <h2>
            Découvrez l'Algérie autrement avec Algeriescapades : votre porte
            d'entrée vers des aventure inoubliables
          </h2>
          <button className={styles.cta}>Explorez Maintenant</button>
        </div>
      </div>

      <div className={styles.content}>
        <p>
          Découvrez l'Algérie comme jamais auparavant avec Algeriescapades.
          Plongez au cœur de paysages époustouflants, de cultures riches et
          d'aventures inoubliables. Réservez dès maintenant et laissez-vous
          guider vers des expériences uniques qui vous feront vivre le voyage de
          toute une vie. Prêt à explorer ?
        </p>
        <h3>Nos escapades en Algérie</h3>
      </div>
    </div>
  );
}
