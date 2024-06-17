import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const escapade = await prisma.escapade.findUnique({
        where: { id: Number(id) },
        include: {
          photo: true,
        },
      });
      if (!escapade) {
        res.status(404).json({ message: "Escapade not found" });
        return;
      }
      res.status(200).json(escapade);
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
