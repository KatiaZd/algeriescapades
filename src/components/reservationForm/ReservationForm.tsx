/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from './ReservationForm.module.scss';

interface AvailableDate {
  id: number;
  date: string;
}

interface ReservationFormProps {
  escapadeId: number;
  escapadePrice: number;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  escapadeId,
  escapadePrice,
}) => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [insurance, setInsurance] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [dates, setDates] = useState<AvailableDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(`/api/escapades/${escapadeId}/dates`);
        const data: AvailableDate[] = await response.json();
        setDates(data);
        if (data.length > 0) {
          setSelectedDate(data[0].id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des dates:", error);
      }
    };

    fetchDates();
  }, [escapadeId]);

  useEffect(() => {
    let calculatedTotal =
      adults * escapadePrice + children * (escapadePrice / 2);
    if (insurance) calculatedTotal += 20;
    setTotal(calculatedTotal);
  }, [adults, children, insurance, escapadePrice]);

  const handleAdultsChange = (value: number) => {
    const newTotal = value + children;
    if (newTotal <= 8) {
      setAdults(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Le nombre total de voyageurs ne doit pas excéder 8.");
    }
  };

  const handleChildrenChange = (value: number) => {
    if (adults > 0) {
      const newTotal = adults + value;
      if (newTotal <= 8) {
        setChildren(value);
        setErrorMessage("");
      } else {
        setErrorMessage("Le nombre total de voyageurs ne doit pas excéder 8 voyageurs.");
      }
    } else {
      setErrorMessage(
        "Vous devez ajouter au moins un adulte avant d'ajouter des enfants."
      );
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!termsAccepted) {
      setErrorMessage("Vous devez accepter les CGV afin de continuer votre réservation");
      return;
    }

    if (!session) {
      router.push("/login");
      return;
    }

    const reservation = {
      utilisateurId: session.user.id,
      escapadeId,
      nombre_adulte: adults,
      nombre_enfant: children,
      assurance_annulation: insurance,
      accepter_conditions: termsAccepted,
      prix_total: total,
      date_depart: selectedDate,
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Votre réservation a été effectuée avec succès.");
        setErrorMessage("");
        // Rediriger avec l'ID de la réservation
        router.push(`/payment?reservationId=${data.id}`);
      } else {
        setErrorMessage("Erreur lors de la réservation");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation:", error);
      setErrorMessage("Erreur lors de la réservation");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reservationForm}>
      <div className={styles.dateSelection}>
        <label>1. Date de départ</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(Number(e.target.value))}
        >
          {dates.map((date) => (
            <option key={date.id} value={date.id}>
              {new Date(date.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.travelerCount}>
        <p>2. Nombre de voyageurs</p>
        <label>Adultes</label>
        <input
          type="number"
          value={adults}
          onChange={(e) => handleAdultsChange(parseInt(e.target.value, 10))}
          min="1"
          max="8"
        />
        <label>Enfants</label>
        <input
          type="number"
          value={children}
          onChange={(e) => handleChildrenChange(parseInt(e.target.value, 10))}
          min="0"
          max="3"
        />
      </div>
      <div className={styles.insurance}>
        <div className={styles.terms}>
          <label>
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
            />
            Assurance annulation - 20 €
          </label>
        </div>
        <div className={styles.terms}>
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            Je reconnais avoir pris connaissance et accepter les conditions
            générales de vente et la politique de confidentialité.
          </label>
        </div>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <div className={styles.total}>
        <label>Total : {total} €</label>
      </div>
      <div className={styles.submitButton}>
        <button className={styles.cta} type="submit">
          Réserver
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
