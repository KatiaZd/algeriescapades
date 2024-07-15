/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import styles from "./EscapadeDetails.module.scss";
import ReservationForm from "../../components/reservationForm/ReservationForm";

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
  photo?: { id: number; url_photo: string }[];
};

const EscapadeDetails: React.FC<{ escapade: Escapade }> = ({ escapade }) => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.description}>
        <div className={styles.photos}>
          {escapade.photo && escapade.photo.length > 0 ? (
            escapade.photo.map((photo) => (
              <Image
                key={photo.id}
                src={photo.url_photo}
                alt={escapade.titre}
                width={630}
                height={638}
                objectFit="cover"
              />
            ))
          ) : (
            <Image
              src="/img/default-photo.jpg"
              alt="Image par défaut"
              width={500}
              height={300}
              objectFit="cover"
            />
          )}
        </div>
        <h1>{escapade.titre}</h1>
        <p>{escapade.prix} € par personne</p>
        <p>{escapade.description}</p>

        <h3>{escapade.titre}</h3>
        <p>{escapade.prix} € par personne</p>
        <p>{escapade.description_principale}</p>
        <h3>Votre escapade</h3>
        <p>{escapade.votre_escapade}</p>
        <h3>Infos pratiques</h3>
        <p>{escapade.info_pratique}</p>
      </div>

      <div>
        <h3>Réservation</h3>
        <ReservationForm
          escapadeId={escapade.id}
          escapadePrice={escapade.prix}
        />
      </div>
    </div>
  );
};

export default EscapadeDetails;
