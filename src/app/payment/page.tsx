/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Escapade {
  titre: string;
  description: string;
  prix: number;
}

interface AvailableDate {
  id: number;
  date: string;
}

interface Reservation {
  id: number;
  escapade: Escapade;
  availableDate: AvailableDate;
  nombre_adulte: number;
  nombre_enfant: number;
  prix_total: number;
}

const PaymentPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (session) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data: Reservation[]) => {
          if (data.length > 0) {
            setReservation(data[0]);
          }
        })
        .catch((error) => console.error("Error fetching reservation:", error));
    } else {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return <p>Vous devez être connecté pour accéder à cette page.</p>;
  }

  if (!reservation) {
    return <p>Chargement des détails de la réservation...</p>;
  }

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logique de paiement à implémenter
    router.push("/confirmation");
  };

  const parsedDate = new Date(reservation.availableDate.date);

  return (
    <div>
      <h1>Paiement</h1>
      {reservation.escapade ? (
        <>
          <p>Escapade: {reservation.escapade.titre}</p>
          <p>Date de départ: {parsedDate.toLocaleDateString("fr-FR")}</p>
          <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
          <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
          <p>Prix total: {reservation.prix_total} €</p>
        </>
      ) : (
        <p>Chargement des détails de l'escapade...</p>
      )}
      <form onSubmit={handlePayment}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Numéro de carte"
          required
        />
        <input
          type="text"
          name="cardExpiry"
          placeholder="Date d'expiration"
          required
        />
        <input type="text" name="cardCVC" placeholder="CVC" required />
        <button type="submit">Payer</button>
      </form>
    </div>
  );
};

export default PaymentPage;
