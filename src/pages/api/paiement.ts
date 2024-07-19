import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { reservationId, montant, date } = req.body;

    if (!reservationId || !montant || !date) {
      return res.status(400).json({ error: "Données d'entrée invalides" });
    }

    try {
      const paiement = await prisma.paiement.create({
        data: {
          reservationId,
          montant,
          date: new Date(date),
        },
      });

      res.status(201).json(paiement);
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error);
      res.status(500).json({ error: "Erreur lors de la création du paiement" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
