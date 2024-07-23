/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./ProfilePage.module.scss";

interface Option {
  id: number;
  description: string;
  prix: number;
}

interface Escapade {
  id: number;
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
  options: Option[];
  escapadeId: number;
  assurance_annulation: boolean;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [optionsByReservation, setOptionsByReservation] = useState<{
    [key: number]: Option[];
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number[];
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<Reservation | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [optionMessages, setOptionMessages] = useState<{ [key: number]: string }>({});
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/reservation?userId=${session.user.id}`);
        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]); // Assurez-vous que reservations est toujours un tableau
      }
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session) {
      fetchReservations();
    }
  }, [session, fetchReservations]);

  useEffect(() => {
    if (reservations.length > 0) {
      reservations.forEach((reservation) => {
        fetch(`/api/escapades/${reservation.escapadeId}/options`)
          .then((res) => res.json())
          .then((data: Option[]) => {
            setOptionsByReservation((prev) => ({
              ...prev,
              [reservation.id]: data,
            }));

            const selectedOptionsForReservation = reservation.options.map(
              (option) => option.id
            );
            setSelectedOptions((prev) => ({
              ...prev,
              [reservation.id]: selectedOptionsForReservation,
            }));
          })
          .catch((error) => {
            console.error("Error fetching options:", error);
          });
      });
    }
  }, [reservations]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  const handleOptionChange = async (
    reservationId: number,
    optionId: number
  ) => {
    try {
      const response = await fetch(
        `/api/reservation/${reservationId}/options`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ optionId }),
        }
      );

      if (response.ok) {
        setSelectedOptions((prev) => {
          const currentSelectedOptions = prev[reservationId] || [];
          const newSelectedOptions = currentSelectedOptions.includes(optionId)
            ? currentSelectedOptions.filter((id) => id !== optionId)
            : [...currentSelectedOptions, optionId];

          return {
            ...prev,
            [reservationId]: newSelectedOptions,
          };
        });

        const currentSelectedOptions = selectedOptions[reservationId] || [];
        const newSelectedOptions = currentSelectedOptions.includes(optionId)
          ? currentSelectedOptions.filter((id) => id !== optionId)
          : [...currentSelectedOptions, optionId];

        const totalPrix = newSelectedOptions.reduce((sum: number, id: number) => {
          const option = optionsByReservation[reservationId]?.find((opt) => opt.id === id);
          return option ? sum + option.prix : sum;
        }, 0);

        const reservation = reservations.find((r) => r.id === reservationId);
        if (reservation) {
          const message = `Nous avons pris en compte votre option. Vous payerez ${
            totalPrix
          } € le ${new Date(reservation.availableDate.date).toLocaleDateString(
            "fr-FR"
          )} auprès de votre guide.`;
          setOptionMessages((prev) => ({
            ...prev,
            [reservationId]: message,
          }));
        }
      } else {
        console.error("Erreur lors de l'enregistrement de l'option");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'option:", error);
    }
  };

  const handleCancelReservation = (reservation: Reservation) => {
    setReservationToCancel(reservation);
    setShowModal(true);
  };

  const confirmCancelReservation = async (): Promise<void> => {
    if (!reservationToCancel) return;

    try {
      const response = await fetch(`/api/reservation/${reservationToCancel.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReservations((prev) =>
          prev.filter((r) => r.id !== reservationToCancel.id)
        );
        setShowModal(false);
        setCancelMessage("Votre réservation a bien été annulée.");
      } else {
        throw new Error("Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      setCancelMessage("Erreur lors de l'annulation de la réservation.");
    }
  };

  if (!session) {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  if (!Array.isArray(reservations) || reservations.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bienvenue, {session.user.name} {session.user.prenom}
        </h1>
        <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
          Se déconnecter
        </button>
        <p className={styles.message}>Vous n'avez pas d'escapade réservée.</p>
        <a className={styles.link} href="/">Voir les escapades</a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Bienvenue, {session.user.name} {session.user.prenom}
      </h1>
      <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
        Se déconnecter
      </button>

      {Array.isArray(reservations) && reservations.map((reservation) => (
        <div key={reservation.id} className={styles.reservationBlock}>
          <h2>Votre Réservation</h2>
          {reservation.escapade ? (
            <>
              <p>Escapade: {reservation.escapade.titre}</p>
              <p>
                Date de départ:{" "}
                {new Date(reservation.availableDate.date).toLocaleDateString(
                  "fr-FR"
                )}
              </p>
              <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
              <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
              <p>Prix total: {reservation.prix_total} €</p>
              <h2>Options supplémentaires</h2>
              <div className={styles.options}>
                {optionsByReservation[reservation.id]?.length > 0 ? (
                  optionsByReservation[reservation.id].map((option) => (
                    <div key={option.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[reservation.id]?.includes(
                              option.id
                            ) || false
                          }
                          onChange={() =>
                            handleOptionChange(reservation.id, option.id)
                          }
                        />
                        {option.description} - {option.prix} €
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Pas d'option disponible</p>
                )}
              </div>
              {optionMessages[reservation.id] && (
                <p className={styles.message}>{optionMessages[reservation.id]}</p>
              )}
            </>
          ) : (
            <p>Chargement des détails de l'escapade...</p>
          )}
          <button className={styles.button} onClick={() => handleCancelReservation(reservation)}>
            Annuler la réservation
          </button>
        </div>
      ))}

      {cancelMessage && <p className={styles.cancelMessage}>{cancelMessage}</p>}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Voulez-vous vraiment annuler cette réservation ?</p>
            {reservationToCancel?.assurance_annulation ? (
              <p>Vous avez pris une assurance annulation.</p>
            ) : (
              <p>Vous n'avez pas pris d'assurance annulation.</p>
            )}
            <button className={styles.button} onClick={confirmCancelReservation}>Oui</button>
            <button className={styles.button} onClick={() => setShowModal(false)}>Non</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
