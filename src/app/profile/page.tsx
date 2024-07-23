 /* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<any[]>([]);
  const [optionsByReservation, setOptionsByReservation] = useState<{
    [key: number]: any[];
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number[];
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setReservations(data);
          } else {
            setReservations([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
        });
    }
  }, [session]);

  useEffect(() => {
    if (reservations.length > 0) {
      reservations.forEach((reservation) => {
        fetch(`/api/escapades/${reservation.escapadeId}/options`)
          .then((res) => res.json())
          .then((data) => {
            setOptionsByReservation((prev) => ({
              ...prev,
              [reservation.id]: data,
            }));

            const selectedOptionsForReservation = reservation.options.map(
              (option: any) => option.optionId
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

        const selectedOption = optionsByReservation[reservationId]?.find(
          (option) => option.id === optionId
        );
        if (
          selectedOption &&
          !selectedOptions[reservationId]?.includes(optionId)
        ) {
          const reservation = reservations.find((r) => r.id === reservationId);
          const message = `Nous avons pris en compte votre option. Vous payerez ${
            selectedOption.prix
          } € le ${new Date(reservation.availableDate.date).toLocaleDateString(
            "fr-FR"
          )} auprès de votre guide.`;
          setMessage(message);
        } else {
          setMessage(null);
        }
      } else {
        console.error("Erreur lors de l'enregistrement de l'option");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'option:", error);
    }
  };

  const handleCancelReservation = (reservation: any) => {
    setReservationToCancel(reservation);
    setShowModal(true);
  };

  const confirmCancelReservation = async (): Promise<void> => {
    try {
      await fetch(`/api/reservation/${reservationToCancel.id}`, {
        method: "DELETE",
      });
      setReservations((prev) =>
        prev.filter((r) => r.id !== reservationToCancel.id)
      );
      setShowModal(false);
      alert("Votre réservation a bien été annulée");
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Erreur lors de l'annulation de la réservation");
    }
  };

  if (!session) {
    return <p>Vous devez être connecté pour voir cette page.</p>;
  }

  if (reservations.length === 0) {
    return (
      <div>
        <h1>
          Bienvenue, {session.user.name} {session.user.prenom}
        </h1>
        <button onClick={handleLogout}>Se déconnecter</button>
        <p>Vous n'avez pas d'escapade réservée.</p>
        <a href="/">Voir les escapades</a>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Bienvenue, {session.user.name} {session.user.prenom}
      </h1>
      <button onClick={handleLogout}>Se déconnecter</button>

      {reservations.map((reservation) => (
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
            </>
          ) : (
            <p>Chargement des détails de l'escapade...</p>
          )}
          <button onClick={() => handleCancelReservation(reservation)}>
            Annuler la réservation
          </button>
        </div>
      ))}

      {message && <p>{message}</p>}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Voulez-vous vraiment annuler cette réservation ?</p>
            {reservationToCancel.assurance_annulation ? (
              <p>Vous avez pris une assurance annulation.</p>
            ) : (
              <p>Vous n'avez pas pris d'assurance annulation.</p>
            )}
            <button onClick={confirmCancelReservation}>Oui</button>
            <button onClick={() => setShowModal(false)}>Non</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;



// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import styles from "./ProfilePage.module.scss";

// const ProfilePage = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [reservations, setReservations] = useState<any[]>([]);
//   const [availableOptions, setAvailableOptions] = useState<any[]>([]);
//   const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [reservationToCancel, setReservationToCancel] = useState<any>(null);
//   const [message, setMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (session) {
//       fetch(`/api/reservation?userId=${session.user.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             setReservations(data);
//           } else {
//             setReservations([]);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching reservations:", error);
//         });
//     }
//   }, [session]);

//   useEffect(() => {
//     if (reservations.length > 0) {
//       fetch(`/api/escapades/${reservations[0].escapadeId}/options`)
//         .then((res) => res.json())
//         .then((data) => {
//           setAvailableOptions(data);
//           const selectedOptions = reservations.flatMap((reservation) =>
//             reservation.options.map((option: any) => option.optionId)
//           );
//           setSelectedOptions(selectedOptions);
//         })
//         .catch((error) => {
//           console.error("Error fetching options:", error);
//         });
//     }
//   }, [reservations]);

//   const handleLogout = () => {
//     signOut();
//     router.push("/login");
//   };

//   const handleOptionChange = (optionId: number) => {
//     setSelectedOptions((prev) =>
//       prev.includes(optionId)
//         ? prev.filter((id) => id !== optionId)
//         : [...prev, optionId]
//     );

//     const selectedOption = availableOptions.find(
//       (option) => option.id === optionId
//     );
//     if (selectedOption && !selectedOptions.includes(optionId)) {
//       const reservation = reservations[0];
//       const message = `Nous avons pris en compte votre option. Vous payerez ${
//         selectedOption.prix
//       } € le ${new Date(reservation.availableDate.date).toLocaleDateString(
//         "fr-FR"
//       )} auprès de votre guide.`;
//       setMessage(message);
//     } else {
//       setMessage(null);
//     }
//   };

//   const handleCancelReservation = (reservation: any) => {
//     setReservationToCancel(reservation);
//     setShowModal(true);
//   };

//   const confirmCancelReservation = async (): Promise<void> => {
//     try {
//       await fetch(`/api/reservation/${reservationToCancel.id}`, {
//         method: "DELETE",
//       });
//       setReservations((prev) =>
//         prev.filter((r) => r.id !== reservationToCancel.id)
//       );
//       setShowModal(false);
//       alert("Votre réservation a bien été annulée");
//     } catch (error) {
//       console.error("Error cancelling reservation:", error);
//       alert("Erreur lors de l'annulation de la réservation");
//     }
//   };

//   if (!session) {
//     return <p>Vous devez être connecté pour voir cette page.</p>;
//   }

//   if (reservations.length === 0) {
//     return (
//       <div>
//         <h1>
//           Bienvenue, {session.user.name} {session.user.prenom}
//         </h1>
//         <button onClick={handleLogout}>Se déconnecter</button>
//         <p>Vous n'avez pas d'escapade réservée.</p>
//         <a href="/">Voir les escapades</a>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>
//         Bienvenue, {session.user.name} {session.user.prenom}
//       </h1>
//       <button onClick={handleLogout}>Se déconnecter</button>

//       {reservations.map((reservation) => (
//         <div key={reservation.id} className={styles.reservationBlock}>
//           <h2>Votre Réservation</h2>
//           {reservation.escapade ? (
//             <>
//               <p>Escapade: {reservation.escapade.titre}</p>
//               <p>
//                 Date de départ:{" "}
//                 {new Date(reservation.availableDate.date).toLocaleDateString(
//                   "fr-FR"
//                 )}
//               </p>
//               <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
//               <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
//               <p>Prix total: {reservation.prix_total} €</p>
//               <h2>Options supplémentaires</h2>
//               {availableOptions.length > 0 ? (
//                 availableOptions.map((option) => (
//                   <div key={option.id}>
//                     <label>
//                       <input
//                         type="checkbox"
//                         checked={selectedOptions.includes(option.id)}
//                         onChange={() => handleOptionChange(option.id)}
//                       />
//                       {option.description} - {option.prix} €
//                     </label>
//                   </div>
//                 ))
//               ) : (
//                 <p>Pas d'option disponible</p>
//               )}
//             </>
//           ) : (
//             <p>Chargement des détails de l'escapade...</p>
//           )}
//           <button onClick={() => handleCancelReservation(reservation)}>
//             Annuler la réservation
//           </button>
//         </div>
//       ))}

//       {message && <p>{message}</p>}

//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <p>Voulez-vous vraiment annuler cette réservation ?</p>
//             {reservationToCancel.assurance_annulation ? (
//               <p>Vous avez pris une assurance annulation.</p>
//             ) : (
//               <p>Vous n'avez pas pris d'assurance annulation.</p>
//             )}
//             <button onClick={confirmCancelReservation}>Oui</button>
//             <button onClick={() => setShowModal(false)}>Non</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;