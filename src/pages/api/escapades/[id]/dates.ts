// pages/api/escapades/[id]/dates.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const dates = await prisma.availableDate.findMany({
        where: { escapadeId: Number(id) },
      });
      res.status(200).json(dates);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des dates" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
