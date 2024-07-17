export interface Escapade {
  id: number;
  titre: string;
  description: string;
  description_principale: string;
  votre_escapade: string;
  info_pratique: string;
  region: string;
  duree: number;
  prix: number;
}

export interface AvailableDate {
  id: number;
  date: string; 
  escapadeId: number;
}

export interface Reservation {
  id: number;
  utilisateurId: number;
  escapadeId: number;
  date_depart: number; 
  nombre_adulte: number;
  nombre_enfant: number;
  assurance_annulation: boolean;
  accepter_conditions: boolean;
  prix_total: number;
  escapade: Escapade;
  availableDate: AvailableDate;
}
