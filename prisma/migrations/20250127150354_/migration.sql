/*
  Warnings:

  - You are about to drop the column `twoFactorAuthConfirmationId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `TwoFactorAuthConfirmation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TwoFactorAuthConfirmation" DROP CONSTRAINT "TwoFactorAuthConfirmation_email_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "twoFactorAuthConfirmationId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "TwoFactorAuthConfirmation";

-- CreateTable
CREATE TABLE "CropSuggestion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "suggestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CropSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CropSuggestion_userId_key" ON "CropSuggestion"("userId");

-- AddForeignKey
ALTER TABLE "CropSuggestion" ADD CONSTRAINT "CropSuggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
