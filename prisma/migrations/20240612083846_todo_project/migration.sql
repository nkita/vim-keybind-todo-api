/*
  Warnings:

  - Added the required column `user_id` to the `TodoLabel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `TodoProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TodoLabel" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TodoProject" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TodoProject" ADD CONSTRAINT "TodoProject_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoLabel" ADD CONSTRAINT "TodoLabel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
