import { prisma } from "../lib/prisma";

export class TransactionService {
  static async create(data: {
    title: string;
    amount: number;
    type: "income" | "expense";
    categoryId: string;
    userId: string;
  }) {
    return prisma.transaction.create({ data });
  }

  static async list(userId: string) {
    return prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
    });
  }

  static async getById(id: string, userId: string) {
    return prisma.transaction.findFirst({
      where: { id, userId },
      include: { category: true },
    });
  }

  static async update(
    id: string,
    userId: string,
    data: {
      title?: string;
      amount?: number;
      type?: "income" | "expense";
      categoryId?: string;
    }
  ) {
    return prisma.transaction.updateMany({
      where: { id, userId },
      data,
    });
  }

  static async delete(id: string, userId: string) {
    return prisma.transaction.deleteMany({ where: { id, userId } });
  }
}
