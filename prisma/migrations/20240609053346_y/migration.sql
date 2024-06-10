/*
  Warnings:

  - You are about to drop the column `name` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `name` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "name";
