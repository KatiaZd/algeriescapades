// src/pages/api/escapades/[id]/options.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid escapade ID" });
  }

  try {
    const options = await prisma.option.findMany({
      where: { escapadeId: parseInt(id as string, 10) },
    });

    res.status(200).json(options);
  } catch (error) {
    console.error("Error fetching options:", error);
    res.status(500).json({ error: "Error fetching options" });
  }
}
