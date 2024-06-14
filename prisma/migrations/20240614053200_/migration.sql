/*
  Warnings:

  - You are about to drop the column `userId` on the `TodoList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `TodoList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_userId_fkey";

-- DropIndex
DROP INDEX "TodoList_userId_key";

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TodoList_user_id_key" ON "TodoList"("user_id");

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
