import prisma from "@/db/prisma";

export const select = async (where: any) => await prisma.todoList.findMany({ where: where })
