-- AlterTable
ALTER TABLE "TodoLabel" ADD COLUMN     "todo_list_id" TEXT;

-- AlterTable
ALTER TABLE "TodoProject" ADD COLUMN     "todo_list_id" TEXT;

-- AddForeignKey
ALTER TABLE "TodoProject" ADD CONSTRAINT "TodoProject_todo_list_id_fkey" FOREIGN KEY ("todo_list_id") REFERENCES "TodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoLabel" ADD CONSTRAINT "TodoLabel_todo_list_id_fkey" FOREIGN KEY ("todo_list_id") REFERENCES "TodoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
