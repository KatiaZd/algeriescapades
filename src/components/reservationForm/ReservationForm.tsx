/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AvailableDate {
  id: number;
  date: string;
}

interface Option {
  id: number;
  description: string;
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
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

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

    const fetchOptions = async () => {
      try {
        const response = await fetch(`/api/escapades/${escapadeId}/options`);
        const data: Option[] = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des options:", error);
      }
    };

    fetchDates();
    fetchOptions();
  }, [escapadeId]);

  useEffect(() => {
    let calculatedTotal =
      adults * escapadePrice + children * (escapadePrice / 2);
    if (insurance) calculatedTotal += 20;
    setTotal(calculatedTotal);
  }, [adults, children, insurance, escapadePrice]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!termsAccepted) {
      alert("Vous devez accepter les CGV afin de continuer votre réservation");
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
      options: selectedOptions,
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
        router.push("/payment");
      } else {
        alert("Erreur lors de la réservation");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation:", error);
      alert("Erreur lors de la réservation");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
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
      <div>
        <label>Nombre d'adultes</label>
        <input
          type="number"
          value={adults}
          onChange={(e) => setAdults(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label>Nombre d'enfants</label>
        <input
          type="number"
          value={children}
          onChange={(e) => setChildren(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label>Assurance annulation</label>
        <input
          type="checkbox"
          checked={insurance}
          onChange={(e) => setInsurance(e.target.checked)}
        />
      </div>
      <div>
        <label>Accepter les CGV</label>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          required
        />
      </div>
      <div>
        <label>Options supplémentaires</label>
        {options.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="checkbox"
                value={option.id}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setSelectedOptions((prev) =>
                    e.target.checked
                      ? [...prev, value]
                      : prev.filter((id) => id !== value)
                  );
                }}
              />
              {option.description}
            </label>
          </div>
        ))}
      </div>
      <div>
        <label>Total : {total} €</label>
      </div>
      <button type="submit">Réserver</button>
    </form>
  );
};

export default ReservationForm;
