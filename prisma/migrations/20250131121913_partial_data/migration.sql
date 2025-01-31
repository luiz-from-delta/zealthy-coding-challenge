/*
  Warnings:

  - You are about to alter the column `aboutMe` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "aboutMe" DROP NOT NULL,
ALTER COLUMN "aboutMe" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "birthDate" DROP NOT NULL;
