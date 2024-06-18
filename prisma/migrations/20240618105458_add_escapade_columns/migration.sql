-- CreateTable
CREATE TABLE "escapade" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "description_principale" TEXT NOT NULL,
    "votre_escapade" TEXT NOT NULL,
    "info_pratique" TEXT NOT NULL,
    "region" VARCHAR(100) NOT NULL,
    "thematique" VARCHAR(100) NOT NULL,
    "duree" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "escapade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favori" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "escapadeId" INTEGER NOT NULL,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paiement" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "url_photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_escapade" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "escapadeId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "date_de_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "utilisateur"("email");

-- AddForeignKey
ALTER TABLE "favori" ADD CONSTRAINT "Favori_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favori" ADD CONSTRAINT "Favori_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiement" ADD CONSTRAINT "Paiement_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "Photo_id_escapade_fkey" FOREIGN KEY ("id_escapade") REFERENCES "escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "Reservation_escapadeId_fkey" FOREIGN KEY ("escapadeId") REFERENCES "escapade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "Reservation_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
