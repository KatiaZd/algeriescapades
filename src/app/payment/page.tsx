/* eslint-disable react/no-unescaped-entities */
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface Reservation {
//   escapade: {
//     titre: string;
//   };
//   availableDate: {
//     date: string;
//   };
//   nombre_adulte: number;
//   nombre_enfant: number;
//   prix_total: number;
// }

// const PaymentPage = () => {
//   const { data: session } = useSession();
//   const [reservation, setReservation] = useState<Reservation | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       fetch(`/api/reservation?userId=${session.user.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setReservation(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching reservation:", error);
//         });
//     } else {
//       router.push("/login");
//     }
//   }, [session, router]);

//   if (!session) {
//     return <p>Vous devez être connecté pour accéder à cette page.</p>;
//   }

//   if (!reservation) {
//     return <p>Chargement des détails de la réservation...</p>;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Gérer la logique de paiement ici
//     // En cas de succès :
//     router.push("/confirmation");
//   };

//   return (
//     <div>
//       <h1>Paiement</h1>
//       <p>Escapade: {reservation.escapade.titre}</p>
//       <p>
//         Date de départ:{" "}
//         {new Date(reservation.availableDate.date).toLocaleDateString()}
//       </p>
//       <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
//       <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
//       <p>Prix total: {reservation.prix_total} €</p>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="cardNumber"
//           placeholder="Numéro de carte"
//           required
//         />
//         <input
//           type="text"
//           name="cardExpiry"
//           placeholder="Date d'expiration de la carte"
//           required
//         />
//         <input type="text" name="cardCVC" placeholder="CVC" required />
//         <button type="submit">Payer</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Reservation {
  escapade: {
    titre: string;
  };
  availableDate: {
    date: string;
  };
  nombre_adulte: number;
  nombre_enfant: number;
  prix_total: number;
}

const PaymentPage = () => {
  const { data: session } = useSession();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setReservation(data);
        })
        .catch((error) => {
          console.error("Error fetching reservation:", error);
        });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Gérer la logique de paiement ici
    // En cas de succès :
    router.push("/confirmation");
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
          placeholder="Numéro de carte"
          required
        />
        <input
          type="text"
          name="cardExpiry"
          placeholder="Date d'expiration de la carte"
          required
        />
        <input type="text" name="cardCVC" placeholder="CVC" required />
        <button type="submit">Payer</button>
      </form>
    </div>
  );
};

export default PaymentPage;
