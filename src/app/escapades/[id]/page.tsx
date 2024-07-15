"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import EscapadeDetails from "../../../components/escapadeDetails/EscapadeDetails";
import styles from "./styles.module.scss";

type Escapade = {
  id: number;
  titre: string;
  description: string;
  description_principale: string;
  votre_escapade: string;
  info_pratique: string;
  region: string;
  duree: number;
  prix: number;
  photo: {
    id: number;
    url_photo: string;
  }[];
  thematique: string;
};

type Reservation = {
  id_utilisateur: number;
  id_escapade: number;
  date_depart: string;
  nombre_adulte: number;
  nombre_enfant: number;
  assurance_annulation: boolean;
  prix_total: number;
};

const EscapadePage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [escapade, setEscapade] = useState<Escapade | null>(null);

  useEffect(() => {
    const fetchEscapade = async () => {
      const res = await fetch(`/api/escapades/${id}`);
      const data = await res.json();
      setEscapade(data);
    };

    if (id) {
      fetchEscapade();
    }
  }, [id]);

  if (!escapade) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        &#8592; Retour
      </button>
      <EscapadeDetails escapade={escapade} />
    </div>
  );
};

export default EscapadePage;
