/*
  Warnings:

  - You are about to drop the `escapade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paiement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilisateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favori" DROP CONSTRAINT "Favori_escapadeId_fkey";

-- DropForeignKey
ALTER TABLE "favori" DROP CONSTRAINT "Favori_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "paiement" DROP CONSTRAINT "Paiement_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "Photo_id_escapade_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "Reservation_escapadeId_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "Reservation_utilisateurId_fkey";

-- DropTable
DROP TABLE "escapade";

-- DropTable
DROP TABLE "favori";

-- DropTable
DROP TABLE "paiement";

-- DropTable
DROP TABLE "photo";

-- DropTable
DROP TABLE "reservation";

-- DropTable
DROP TABLE "utilisateur";

-- CreateTable
CREATE TABLE "Escapade" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "description_principale" TEXT NOT NULL,
    "votre_escapade" TEXT NOT NULL,
    "info_pratique" TEXT NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "duree" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Escapade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favori" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "escapadeId" INTEGER NOT NULL,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "url_photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_escapade" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "escapadeId" INTEGER NOT NULL,
    "date_depart" TIMESTAMP(3) NOT NULL,
    "nombre_adulte" INTEGER NOT NULL,
    "nombre_enfant" INTEGER NOT NULL,
    "assurance_annulation" BOOLEAN NOT NULL DEFAULT false,
    "accepter_conditions" BOOLEAN NOT NULL DEFAULT false,
    "prix_total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "date_de_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thematique" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(100) NOT NULL,

    CONSTRAINT "Thematique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscapadeThematique" (
    "escapadeId" INTEGER NOT NULL,
    "thematiqueId" INTEGER NOT NULL,

    CONSTRAINT "EscapadeThematique_pkey" PRIMARY KEY ("escapadeId","thematiqueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "Escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_escapade_fkey" FOREIGN KEY ("id_escapade") REFERENCES "Escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "Escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapadeThematique" ADD CONSTRAINT "EscapadeThematique_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "Escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscapadeThematique" ADD CONSTRAINT "EscapadeThematique_thematiqueId_fkey" FOREIGN KEY ("thematiqueId") REFERENCES "Thematique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
