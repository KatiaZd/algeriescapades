/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./EscapadeDetails.module.scss";

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

type Reservation = {
  id_utilisateur: number;
  id_escapade: number;
  date_depart: string;
  nombre_adulte: number;
  nombre_enfant: number;
  assurance_annulation: boolean;
  prix_total: number;
};

const EscapadeDetails: React.FC<{ escapade: Escapade }> = ({ escapade }) => {
  const [reservation, setReservation] = useState<Partial<Reservation>>({
    id_escapade: escapade.id,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
    if (response.ok) {
      alert("Réservation réussie!");
      // router.push("/"); // Redirige vers la page d'accueil ou une page de confirmation
    } else {
      alert("La réservation a échoué!");
    }
  };

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

        {/* Button Reserver */}

        <h3>{escapade.titre}</h3>
        <p>{escapade.prix} € par personne</p>
        <p>{escapade.description_principale}</p>
        <h3>Votre escapade</h3>
        <p>{escapade.votre_escapade}</p>
        <h3>Infos pratiques</h3>
        <p>{escapade.info_pratique}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.reservationForm}>
        <h2>Réservation</h2>
        <label>
          Date de départ:
          <input
            type="date"
            name="date_depart"
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Nombre d'adultes:
          <input
            type="number"
            name="nombre_adulte"
            onChange={handleInputChange}
            required
            min="1"
          />
        </label>
        <label>
          Nombre d'enfants:
          <input
            type="number"
            name="nombre_enfant"
            onChange={handleInputChange}
            required
            min="0"
          />
        </label>
        <label>
          Assurance annulation:
          <input
            type="checkbox"
            name="assurance_annulation"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Prix total:
          <input
            type="number"
            name="prix_total"
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
};

export default EscapadeDetails;
