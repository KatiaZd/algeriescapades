/* eslint-disable react/no-unescaped-entities */
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";

// const ProfilePage = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [reservation, setReservation] = useState<any>(null);
//   const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

//   useEffect(() => {
//     if (session) {
//       fetch(`/api/reservation?userId=${session.user.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setReservation(data);
//           setSelectedOptions(data.options.map((opt: any) => opt.optionId));
//         })
//         .catch((error) => {
//           console.error("Error fetching reservation:", error);
//         });
//     }
//   }, [session]);

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
//   };

//   if (!session) {
//     return <p>You must be logged in to view this page.</p>;
//   }

//   if (!reservation) {
//     return <p>Loading reservation details...</p>;
//   }

//   return (
//     <div>
//       <h1>Bienvenue, {session.user.name}</h1>
//       <button onClick={handleLogout}>Déconnexion</button>

//       <h2>Votre réservation</h2>
//       <p>Escapade: {reservation.escapade.titre}</p>
//       <p>
//         Date de départ:{" "}
//         {new Date(reservation.availableDate.date).toLocaleDateString()}
//       </p>
//       <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
//       <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
//       <p>Prix total: {reservation.prix_total} €</p>

//       <h2>Options supplémentaires</h2>
//       {reservation.options.length > 0 ? (
//         reservation.options.map((option: any) => (
//           <div key={option.optionId}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedOptions.includes(option.optionId)}
//                 onChange={() => handleOptionChange(option.optionId)}
//               />
//               {option.option.description}
//             </label>
//           </div>
//         ))
//       ) : (
//         <p>Pas d'options additionnel</p>
//       )}

//       <button onClick={() => console.log("Cancel reservation logic here")}>
//         Annuler la réservation
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservation, setReservation] = useState<any>(null);
  const [availableOptions, setAvailableOptions] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    if (session) {
      fetch(`/api/reservation?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setReservation(data);
          setSelectedOptions(data.options.map((opt: any) => opt.optionId));
        })
        .catch((error) => {
          console.error("Error fetching reservation:", error);
        });
    }
  }, [session]);

  useEffect(() => {
    if (reservation) {
      fetch(`/api/escapades/${reservation.escapadeId}/options`)
        .then((res) => res.json())
        .then((data) => {
          setAvailableOptions(data);
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        });
    }
  }, [reservation]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  const handleOptionChange = (optionId: number) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (!reservation) {
    return <p>Loading reservation details...</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={handleLogout}>Se déconnecter</button>

      <h2>Votre Reservation</h2>
      <p>Escapade: {reservation.escapade.titre}</p>
      <p>
        Date de départ:{" "}
        {new Date(reservation.availableDate.date).toLocaleDateString()}
      </p>
      <p>Nombre d'adultes: {reservation.nombre_adulte}</p>
      <p>Nombre d'enfants: {reservation.nombre_enfant}</p>
      <p>Prix total: {reservation.prix_total} €</p>

      <h2>Options supplémentaires</h2>
      {availableOptions.length > 0 ? (
        availableOptions.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
              />
              {option.description} - {option.prix} €
            </label>
          </div>
        ))
      ) : (
        <p>Pas d'option disponible</p>
      )}

      <button onClick={() => console.log("Cancel reservation logic here")}>
        Annuler la réservation
      </button>
    </div>
  );
};

export default ProfilePage;
