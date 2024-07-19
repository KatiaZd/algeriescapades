/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface Escapade {
  titre: string;
  description: string;
  prix: number;
}

interface Reservation {
  id: number;
  escapade: Escapade;
  date_depart: string;
  nombre_adulte: number;
  nombre_enfant: number;
  prix_total: number;
}

const ConfirmationPage = () => {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data: Reservation[]) => {
          setReservations(data);
        })
        .catch((error) => {
          console.error("Error fetching reservation:", error);
        });
    }
  }, [status, session]);

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (status !== "authenticated") {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  if (reservations.length === 0) {
    return (
      <p>Aucune réservation trouvée. Veuillez faire une réservation d'abord.</p>
    );
  }

  const reservation = reservations[0];

  return (
    <div>
      <h1>Confirmation</h1>
      <p>Votre réservation est confirmée !</p>
      <p>Escapade: {reservation.escapade.titre}</p>
      <p>
        Date de départ:{" "}
        {new Date(reservation.date_depart).toLocaleDateString("fr-FR")}
      </p>
      <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
      <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
      <p>Prix total: {reservation.prix_total} €</p>
      <a href="/profile">Voir mon escapade dans mon espace</a>
    </div>
  );
};

export default ConfirmationPage;
