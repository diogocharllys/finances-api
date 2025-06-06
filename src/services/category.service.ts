import { prisma } from '../lib/prisma';

export class CategoryService {
  static async create(name: string, userId: string) {
    return prisma.category.create({
      data: { name, userId },
    });
  }

  static async list(userId: string) {
    return prisma.category.findMany({
      where: { userId },
    });
  }

  static async update(id: string, name: string, userId: string) {
    await prisma.category.updateMany({
      where: { id, userId },
      data: { name },
    });
    return prisma.category.findUnique({ where: { id } });
  }

  static async delete(id: string, userId: string) {
    return prisma.category.deleteMany({
      where: { id, userId },
    });
  }
}
