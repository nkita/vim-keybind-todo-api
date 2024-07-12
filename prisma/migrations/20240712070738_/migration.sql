/*
  Warnings:

  - You are about to drop the column `context_id` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `TodoLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `context` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creationDate` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TodoLabel" DROP CONSTRAINT "TodoLabel_todo_list_id_fkey";

-- DropForeignKey
ALTER TABLE "TodoProject" DROP CONSTRAINT "TodoProject_todo_list_id_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "context_id",
DROP COLUMN "created_at",
DROP COLUMN "project_id",
ADD COLUMN     "context" TEXT NOT NULL,
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "project" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- DropTable
DROP TABLE "TodoLabel";

-- DropTable
DROP TABLE "TodoProject";
