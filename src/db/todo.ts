import prisma from "@/db/prisma";

export const select = async (where: any) => await prisma.todo.findMany({ where: where })
