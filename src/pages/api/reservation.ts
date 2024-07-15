import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      utilisateurId,
      escapadeId,
      nombre_adulte,
      nombre_enfant,
      assurance_annulation,
      accepter_conditions,
      prix_total,
      date_depart,
    } = req.body;

    try {
      const reservation = await prisma.reservation.create({
        data: {
          utilisateurId,
          escapadeId,
          nombre_adulte,
          nombre_enfant,
          assurance_annulation,
          accepter_conditions,
          prix_total,
          date_depart,
        },
      });
      res.status(201).json(reservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de la réservation" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
