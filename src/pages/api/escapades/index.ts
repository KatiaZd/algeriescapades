import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const escapades = await prisma.escapade.findMany({
        include: {
          photo: true,
          thematiques: {
            include: {
              thematique: true,
            },
          },
        },
      });
      res.status(200).json(escapades);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
