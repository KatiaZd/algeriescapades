/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Image from "next/image";
import styles from "../escapadeDetails/EscapadeDetails.module.scss"; 
import ReservationForm from "../reservationForm/ReservationForm"; 

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
  photo?: { id: number; url_photo: string }[];
};

const EscapadeDetails: React.FC<{ escapade: Escapade }> = ({ escapade }) => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>{escapade.titre}</h1>
          <p>{escapade.prix} € par personne</p>
          <p>{escapade.description}</p>
          <button className={styles.cta}>Réserver</button>
        </div>
        <Image
          src={escapade.photo ? escapade.photo[0].url_photo : "/img/default-photo.jpg"}
          alt={escapade.titre}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.textContent}>
          <h2>{escapade.titre}</h2>
          <p>{escapade.description_principale}</p>
          <h3>Votre escapade</h3>
          <p>{escapade.votre_escapade}</p>
          <h3>Infos pratiques</h3>
          <p>{escapade.info_pratique}</p>
        </div>
        <div className={styles.reservation}>
          <h2>Réservation</h2>
          <ReservationForm
            escapadeId={escapade.id}
            escapadePrice={escapade.prix}
          />
        </div>
      </div>
    </div>
  );
};

export default EscapadeDetails;
