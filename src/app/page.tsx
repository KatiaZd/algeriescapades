/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import styles from "./page.module.scss";
import { prisma } from "../lib/prisma";

type Escapade = {
  id: number;
  titre: string;
  description: string;
  description_principale: string;
  votre_escapade: string;
  info_pratique: string;
  region: string;
  thematique: string;
  duree: number;
  prix: number;
  photo: {
    id: number;
    url_photo: string;
    description: string;
    id_escapade: number;
  }[];
};

async function getEscapades(): Promise<Escapade[]> {
  try {
    const escapades = await prisma.escapade.findMany({
      include: {
        photo: true,
      },
    });
     console.log("Escapades:", escapades);
    return escapades as Escapade[];
  } catch (error) {
    console.error("Error fetching escapades:", error);
    return [];
  }
}

// function cleanText(text: string) {
//   return text
//     .replace(/&apos;/g, "'")
//     .replace(/&quot;/g, '"')
//     .replace(/&amp;/g, "&")
//     .replace(/&lt;/g, "<")
//     .replace(/&gt;/g, ">")
//     .replace(/&…;/g, "à")
//     .replace(/Š/g, "è")
//     .replace(/—/g, "ù");
// }

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
      <div className={styles.margin}>
        <div className={styles.content}>
          <p>
            Découvrez l'Algérie comme jamais auparavant avec Algeriescapades.{" "}
            <br />
            Plongez au cœur de paysages époustouflants, de cultures riches et
            d'aventures inoubliables. <br /> Réservez dès maintenant et
            laissez-vous guider vers des expériences uniques qui vous feront
            vivre le voyage de toute une vie. <br />
            Prêt à explorer ?
          </p>

          <h3>Nos escapades en Algérie</h3>
          <div className={styles.filtreIcons}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/filtre.png"
                alt="Filtre"
                width={34}
                height={33}
              />
            </a>
          </div>

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
                <div className={styles.align}>
                  <h4>
                    {escapade.titre} - {escapade.duree} jours
                  </h4>
                  <Image
                    src="/assets/icons/heart.png"
                    alt="Filtre"
                    width={24}
                    height={23}
                  />
                </div>
                <p>
                  {escapade.duree} jours - {escapade.prix} €
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

