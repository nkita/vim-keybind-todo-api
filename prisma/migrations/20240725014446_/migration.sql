/*
  Warnings:

  - You are about to alter the column `sort` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "sort" SET DATA TYPE INTEGER;
