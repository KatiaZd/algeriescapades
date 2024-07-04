/*
  Warnings:

  - Changed the type of `date_depart` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date_depart",
ADD COLUMN     "date_depart" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AvailableDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "escapadeId" INTEGER NOT NULL,

    CONSTRAINT "AvailableDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_date_depart_fkey" FOREIGN KEY ("date_depart") REFERENCES "AvailableDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableDate" ADD CONSTRAINT "AvailableDate_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "Escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
