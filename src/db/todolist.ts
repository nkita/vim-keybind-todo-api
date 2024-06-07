import prisma from "@/db/prisma";

export const select = async (where: any) => {
    return await prisma.todoList.findMany({ where: where })
}
