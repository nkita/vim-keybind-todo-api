import prisma, { Todo } from "@/db/prisma";
import { TodoProps } from "@/type";

export const select = async (options: any) => await prisma.todo.findMany({
    ...options,
    orderBy: { sort: "asc" }
})

/**
 * TodoList更新
 */
interface TodoDBProps extends TodoProps {
    user_id: string
    todo_list_id: string
}
export const upsert = async ({
    id,
    is_complete = false,
    priority = "",
    completionDate,
    creationDate,
    text,
    detail,
    project,
    context,
    user_id,
    todo_list_id,
    isArchived,
    sort
}: TodoDBProps) => await prisma.todo.upsert({
    where: {
        id: id,
        todo_list_id: todo_list_id
    },
    create: {
        id: id,
        is_complete: is_complete,
        priority: priority,
        updated_at: new Date(),
        creationDate: creationDate ?? new Date(),  // created_atをDate型に変換
        completedAt: completionDate ? new Date(completionDate) : undefined,  // completionDateをDate型に変換
        text: text,
        detail: detail ?? "",
        project: project ?? "",
        context: context ?? "",
        todo_list_id: todo_list_id,
        user_id: user_id,
        sort: sort ?? null
    },
    update: {
        updated_at: new Date(),
        is_complete: is_complete,
        priority: priority,
        text: text,
        detail: detail ?? "",
        project: project ?? "",
        context: context ?? "",
        completedAt: completionDate ? new Date(completionDate) : undefined,  // completionDateをDate型に変換
        isArchived: isArchived ?? false,
        sort: sort ?? null
    }
})