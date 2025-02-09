/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isTwoFactorEnabled` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `village` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phosphorus` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Potassium` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nitrogen` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pH` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prediction` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilQuality` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `CropSuggestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CropSuggestion_userId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "village" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CropSuggestion" ADD COLUMN     "Phosphorus" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Potassium" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "nitrogen" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pH" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "prediction" TEXT NOT NULL,
ADD COLUMN     "soilQuality" TEXT NOT NULL,
ADD COLUMN     "village" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image",
DROP COLUMN "isTwoFactorEnabled";

-- CreateTable
CREATE TABLE "ContactForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isSystemUser" BOOLEAN NOT NULL,

    CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");
