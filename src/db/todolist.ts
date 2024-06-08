import prisma from "@/db/prisma";
import { randomUUID } from "crypto";

export const select = async (where: any) => {
    return await prisma.todoList.findMany({ where: where })
}

/**
 * TodoList作成
 */
export const create = async (
    name: string,
    user_id: string
) => await prisma.todoList.create({
    data: {
        id: randomUUID(),
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
        userId: user_id,
    }
})

/**
 * TodoList更新
 */
export const update = async (
    id: string,
    user_id: string,
    name: string
) => await prisma.todoList.update({
    where: {
        id: id,
        userId: user_id
    },
    data: {
        name: name,
        updated_at: new Date(),
    }
})

