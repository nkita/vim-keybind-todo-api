import prisma from "@/db/prisma";

export const select = async (where: any) => await prisma.user.findMany({ where: where })
