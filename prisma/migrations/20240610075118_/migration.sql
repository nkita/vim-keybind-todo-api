/*
  Warnings:

  - You are about to drop the column `list_id` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `name` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "list_id",
DROP COLUMN "name",
ALTER COLUMN "is_complete" DROP NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "completedAt" DROP NOT NULL,
ALTER COLUMN "project_id" DROP NOT NULL,
ALTER COLUMN "context_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" ADD COLUMN     "name" TEXT NOT NULL;
