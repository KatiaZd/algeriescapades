/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Reservation } from "../../types"; 

const PaymentPage = () => {
  const { data: session } = useSession();
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (session) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data: Reservation) => {
          setReservation(data);
        })
        .catch((error) => {
          console.error("Error fetching reservation:", error);
        });
    }
  }, [session]);

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (!reservation) {
    return <p>No reservation found. Please make a reservation first.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment logic here
    // On success:
    // router.push('/confirmation');
  };

  return (
    <div>
      <h1>Paiement</h1>
      <p>Escapade: {reservation.escapade.titre}</p>
      <p>
        Date de départ:{" "}
        {new Date(reservation.availableDate.date).toLocaleDateString()}
      </p>
      <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
      <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
      <p>Prix total: {reservation.prix_total} €</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          required
        />
        <input
          type="text"
          name="cardExpiry"
          placeholder="Card Expiry Date"
          required
        />
        <input type="text" name="cardCVC" placeholder="CVC" required />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PaymentPage;

