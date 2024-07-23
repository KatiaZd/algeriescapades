import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "POST") {
    const { optionId } = req.body;

    if (!id || !optionId) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      const existingOption = await prisma.reservationOption.findFirst({
        where: {
          reservationId: Number(id),
          optionId: Number(optionId),
        },
      });

      if (existingOption) {
        await prisma.reservationOption.delete({
          where: {
            id: existingOption.id,
          },
        });
      } else {
        await prisma.reservationOption.create({
          data: {
            reservationId: Number(id),
            optionId: Number(optionId),
          },
        });
      }

      res.status(201).json({ message: "Option updated successfully" });
    } catch (error) {
      console.error("Error updating options:", error);
      res.status(500).json({ error: "Error updating options" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
