import prisma from "@/db/prisma";

export const select = async (where: any) => await prisma.todoProject.findMany({ where: where })
