import prisma from "@/db/prisma";

export const select = async (where: any) => await prisma.todoLabel.findMany({ where: where })

export const upsert = async ({
    id,
    name,
    todo_list_id,
    user_id
}: {
    id: string
    name: string
    todo_list_id: string
    user_id: string
}) => await prisma.todoLabel.upsert({
    where: {
        id: id,
        todo_list_id: todo_list_id,
        user_id: user_id
    },
    create: {
        id: id,
        name: name,
        todo_list_id: todo_list_id,
        user_id: user_id,
    },
    update: {
        name: name
    }
})