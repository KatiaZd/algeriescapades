/*
  Warnings:

  - A unique constraint covering the columns `[facebook_id]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "facebook_id" TEXT;

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "escapadeId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationOption" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,

    CONSTRAINT "ReservationOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_facebook_id_key" ON "Utilisateur"("facebook_id");

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "Escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationOption" ADD CONSTRAINT "ReservationOption_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationOption" ADD CONSTRAINT "ReservationOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
