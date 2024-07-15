// pages/api/escapades/[id]/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const escapade = await prisma.escapade.findUnique({
        where: { id: Number(id) },
        include: {
          photo: true,
          thematiques: {
            include: {
              thematique: true,
            },
          },
        },
      });

      if (!escapade) {
        return res.status(404).json({ message: "Escapade non trouvée" });
      }

      res.status(200).json(escapade);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'escapade",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
