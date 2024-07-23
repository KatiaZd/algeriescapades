import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
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

        const reservation = await prisma.reservation.create({
          data: {
            utilisateurId: parseInt(utilisateurId, 10),
            escapadeId,
            nombre_adulte,
            nombre_enfant,
            assurance_annulation,
            accepter_conditions,
            prix_total,
            date_depart: new Date(date_depart).getTime(), 
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

    case "PATCH":
      const { id } = req.query; 

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid reservation ID" });
      }

      try {
        const { optionIds } = req.body;

        if (!Array.isArray(optionIds)) {
          return res.status(400).json({ error: "Invalid option IDs" });
        }

        // Supprimer les anciennes options
        await prisma.reservationOption.deleteMany({
          where: { reservationId: parseInt(id as string, 10) },
        });

        // Ajouter les nouvelles options
        const newOptions = optionIds.map((optionId: number) => ({
          reservationId: parseInt(id as string, 10),
          optionId,
        }));

        await prisma.reservationOption.createMany({
          data: newOptions,
        });

        const updatedReservation = await prisma.reservation.findUnique({
          where: { id: parseInt(id as string, 10) },
          include: {
            options: {
              include: {
                option: true,
              },
            },
          },
        });

        res.status(200).json(updatedReservation);
      } catch (error) {
        console.error("Error updating reservation options:", error);
        res
          .status(500)
          .json({
            error:
              "Erreur lors de la mise à jour des options de la réservation",
          });
      }
      break;

    case "DELETE":
      const { id: deleteId } = req.query; 

      if (!deleteId || Array.isArray(deleteId)) {
        return res.status(400).json({ error: "Invalid reservation ID" });
      }

      try {
        // Supprimer les paiements associés à la réservation
        await prisma.paiement.deleteMany({
          where: { reservationId: parseInt(deleteId as string, 10) },
        });

        // Supprimer les options associées à la réservation
        await prisma.reservationOption.deleteMany({
          where: { reservationId: parseInt(deleteId as string, 10) },
        });

        // Supprimer la réservation elle-même
        await prisma.reservation.delete({
          where: { id: parseInt(deleteId as string, 10) },
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
      res.setHeader("Allow", ["POST", "GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
