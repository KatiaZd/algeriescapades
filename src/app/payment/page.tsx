/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./PaymentPage.module.scss";

interface Photo {
  id: number;
  url_photo: string;
  description: string;
  id_escapade: number;
}

interface Escapade {
  id: number;
  titre: string;
  description: string;
  prix: number;
  duree: number;
  photo: Photo[];
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
  assurance_annulation: boolean;
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
    return <p className={styles.message}>Vous devez être connecté pour accéder à votre espace.</p>;
  }

  if (!reservation) {
    return <p className={styles.message}>Chargement des détails de la réservation...</p>;
  }

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/paiement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationId: reservation.id,
          montant: reservation.prix_total,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        router.push("/confirmation");
      } else {
        alert("Erreur lors du traitement du paiement");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du paiement:", error);
      alert("Erreur lors du traitement du paiement");
    }
  };

  const parsedDate = new Date(reservation.availableDate.date);
  const escapade = reservation.escapade;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Paiement</h1>
      {escapade ? (
        <>
          {escapade.photo && escapade.photo.length > 0 && (
            <Image
              src={escapade.photo[0].url_photo}
              alt={escapade.titre || "Escapade"}
              width={200}
              height={200}
              layout="fixed"
            />
          )}
          <div className={styles.escapadeDetails}>
            <p>{escapade.titre}</p>
            <p>
              Départ le {parsedDate.toLocaleDateString("fr-FR")} pour {escapade.duree} jours.
            </p>
            <p>
              {reservation.nombre_adulte}{" "}
              {reservation.nombre_adulte > 1 ? "adultes" : "adulte"}
            </p>
            <p>
              {reservation.nombre_enfant}{" "}
              {reservation.nombre_enfant > 1 ? "enfants" : "enfant"}
            </p>
            <p>
              {reservation.assurance_annulation
                ? "Avec assurance annulation"
                : "Sans assurance annulation"}
            </p>
            <p>Total: {reservation.prix_total} €</p>
          </div>
        </>
      ) : (
        <p className={styles.message}>Chargement des détails de l'escapade...</p>
      )}
      <form className={styles.paymentForm} onSubmit={handlePayment}>
        <input
          className={styles.input}
          type="text"
          name="cardNumber"
          placeholder="Numéro de carte*"
          pattern="\d{8}"
          title="Le numéro de carte doit comporter 8 chiffres"
          required
        />
        <input
          className={styles.input}
          type="text"
          name="cardExpiry"
          placeholder="Date d'expiration*"
          pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
          title="La date d'expiration doit être au format MM/AA"
          required
        />
        <input
          className={styles.input}
          type="text"
          name="cardCVC"
          placeholder="CVV*"
          pattern="\d{3}"
          title="Le CVV doit comporter 3 chiffres"
          required
        />
        <input
          className={styles.input}
          type="text"
          name="titulaireCarte"
          placeholder="Nom Prénom*"
          pattern="[a-zA-Z\s]+"
          title="Le nom du titulaire ne doit comporter que des lettres"
          required
        />
        <button className={styles.cta} type="submit">Payer</button>
      </form>
    </div>
  );
};

export default PaymentPage;
