import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, name, prenom } = req.body; 

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    // Hash le mdp
    const hashedPassword = await hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await prisma.utilisateur.create({
      data: {
        email,
        nom: name,
        prenom, 
        mot_de_passe: hashedPassword,
      },
    });

    res.status(201).json(user);
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
