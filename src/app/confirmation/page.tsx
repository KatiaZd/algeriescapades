/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Reservation } from "../../types"; 

const ConfirmationPage = () => {
  const { data: session, status } = useSession();
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data: Reservation) => {
          setReservation(data);
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

  if (!reservation) {
    return (
      <p>Aucune réservation trouvée. Veuillez faire une réservation d'abord.</p>
    );
  }

  return (
    <div>
      <h1>Confirmation</h1>
      <p>Votre réservation est confirmée !</p>
      <p>Escapade: {reservation.escapade.titre}</p>
      <p>
        Date de départ:{" "}
        {new Date(reservation.availableDate.date).toLocaleDateString("fr-FR")}
      </p>
      <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
      <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
      <p>Prix total: {reservation.prix_total} €</p>
    </div>
  );
};

export default ConfirmationPage;
