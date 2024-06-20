/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import FilterModal from "../components/filtre/FilterModal";

type Escapade = {
  id: number;
  titre: string;
  description: string;
  description_principale: string;
  votre_escapade: string;
  info_pratique: string;
  region: string;
  duree: number;
  prix: number;
  photo: {
    id: number;
    url_photo: string;
    description: string;
    id_escapade: number;
  }[];
  thematiques: {
    thematique: {
      id: number;
      nom: string;
    };
  }[];
};

type Filters = {
  region?: string;
  thematique?: string;
  duree?: string;
};

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [escapades, setEscapades] = useState<Escapade[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilterChange = (filter: { type: string; value: string }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter.type]: filter.value,
    }));
    setIsFilterModalOpen(false);
  };

  const filteredEscapades = escapades.filter((escapade) => {
    const regionMatch = filters.region
      ? escapade.region === filters.region
      : true;
    const thematiqueMatch = filters.thematique
      ? escapade.thematiques?.some((t) => t.thematique.nom === filters.thematique)
      : true;
    const dureeMatch = filters.duree
      ? escapade.duree.toString() === filters.duree
      : true;

    return regionMatch && thematiqueMatch && dureeMatch;
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/escapades");
        const data = await response.json();
        console.log("Fetched escapades: ", data); // Debug
        setEscapades(data);
      } catch (error) {
        console.error("Error fetching escapades:", error);
      }
    }
    fetchData();
  }, []);

  const displayedEscapades = showAll
    ? filteredEscapades
    : filteredEscapades.slice(0, 4);

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
            <button onClick={() => setIsFilterModalOpen(true)}>
              <Image
                src="/assets/icons/filtre.png"
                alt="Filtre"
                width={34}
                height={33}
              />
            </button>
          </div>

          <div className={styles.escapadesGrid}>
            {displayedEscapades.map((escapade: Escapade) => (
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
          <div className={styles.viewAllButtonContainer}>
            <button
              className={styles.viewAllButton}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Voir moins" : "Voir toutes les escapades"}
            </button>
          </div>
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}