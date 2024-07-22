import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
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

      if (
        !utilisateurId ||
        !escapadeId ||
        nombre_adulte == null ||
        nombre_enfant == null ||
        assurance_annulation == null ||
        accepter_conditions == null ||
        prix_total == null ||
        !date_depart
      ) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      try {
        const reservation = await prisma.reservation.create({
          data: {
            utilisateurId: parseInt(utilisateurId, 10),
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
      break;

    case "GET":
      const { userId } = req.query;

      if (!userId || Array.isArray(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      try {
        const reservations = await prisma.reservation.findMany({
          where: { utilisateurId: parseInt(userId as string, 10) },
          include: {
            escapade: true,
            availableDate: true,
            options: {
              include: {
                option: true,
              },
            },
          },
        });

        if (!reservations || reservations.length === 0) {
          return res
            .status(404)
            .json({ error: "No reservations found for this user" });
        }

        res.status(200).json(reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des réservations" });
      }
      break;

    case "DELETE":
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid reservation ID" });
      }

      try {
        await prisma.reservation.delete({
          where: { id: parseInt(id as string, 10) },
        });
        res.status(204).end(); 
      } catch (error) {
        console.error("Error deleting reservation:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la suppression de la réservation" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
