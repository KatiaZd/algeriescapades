/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import FilterModal from "../components/filtre/FilterModal";
import Link from "next/link";

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
    // const router = useRouter();

  // Create a reference for the target element
  const escapadesSectionRef = useRef<HTMLHeadingElement>(null);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const filteredEscapades = escapades.filter((escapade) => {
    const regionMatch = filters.region
      ? escapade.region === filters.region
      : true;
    const thematiqueMatch = filters.thematique
      ? escapade.thematiques?.some(
          (t) => t.thematique.nom === filters.thematique
        )
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

  const handleExploreClick = () => {
    if (escapadesSectionRef.current) {
      escapadesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.body}>
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
          <h2 className={styles.catchPhrase}>
            Découvrez l'Algérie autrement avec Algeriescapades : <br /> Votre
            porte d'entrée vers des aventure inoubliables
          </h2>
          <button className={styles.cta} onClick={handleExploreClick}>
            Explorez Maintenant
          </button>
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

          <h3 ref={escapadesSectionRef}>Nos escapades en Algérie</h3>
          <div className={styles.filtreIcons}>
            <button
              className={styles.filtre}
              onClick={() => setIsFilterModalOpen(true)}
            >
              <Image
                src="/assets/icons/filtre.png"
                alt="Filtre"
                width={34}
                height={33}
              />
            </button>
          </div>

          <div className={styles.escapadesGrid}>
            {filteredEscapades.length > 0 ? (
              displayedEscapades.map((escapade: Escapade) => (
                <div key={escapade.id}>
                  <Link
                    href={`/escapades/${escapade.id}`}
                    className={styles.escapade}
                  >
                    <Image
                      src={escapade.photo[0]?.url_photo || "/default-image.jpg"}
                      alt={escapade.titre || "Escapade"}
                      width={300}
                      height={200}
                      className={styles.escapadeImage}
                    />
                    <div className={styles.align}>
                      <h4>{escapade.titre}</h4>
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
                  </Link>
                </div>
              ))
            ) : (
              <p className={styles.noResults}>
                Nous n'avons trouvé aucune escapade correspondant à vos critères
                actuels. <br /> Nous vous suggérons d'explorer d'autres options
                en ajustant la région, la thématique ou la durée de votre
                recherche.
              </p>
            )}
          </div>
          {filteredEscapades.length > 0 && (
            <div className={styles.viewAllEscapadeContainer}>
              <button
                className={styles.viewAllEscapadeButton}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Voir moins" : "Voir toutes les escapades"}
              </button>
            </div>
          )}
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
