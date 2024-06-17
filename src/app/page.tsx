/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import styles from "./page.module.scss";
import { prisma } from "../lib/prisma"; // Importer Prisma Client

type Escapade = {
  id: number;
  titre: string;
  description: string;
  region: string;
  thematique: string;
  duree: number;
  prix: number;
  photo: {
    url_photo: string;
  }[];
};

async function getEscapades() {
  try {
    // Utiliser Prisma pour récupérer les escapades avec les photos incluses
    const escapades = await prisma.escapade.findMany({
      include: {
        photo: true,
      },
    });
    return escapades;
  } catch (error) {
    console.error("Error fetching escapades:", error);
    return [];
  }
}

export default async function Home() {
  const escapades = await getEscapades();

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
        <div className={styles.escapadesList}>
          {escapades.map((escapade: Escapade) => (
            <div key={escapade.id} className={styles.escapade}>
              <Image
                src={escapade.photo[0]?.url_photo || "/default-image.jpg"}
                alt={escapade.titre || "Escapade"}
                width={300}
                height={200}
                className={styles.escapadeImage}
              />
              <h4>{escapade.titre}</h4>
              <p>{escapade.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
