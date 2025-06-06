import { Response } from "express";
import { CategoryService } from "../services/category.service";
import { AuthRequest } from "../middlewares/auth";

export class CategoryController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    const { name } = req.body;
    const userId = req.userId!;
    const category = await CategoryService.create(name, userId);
    res.status(201).json(category);
  }

  static async list(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const categories = await CategoryService.list(userId);
    res.status(200).json(categories);
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.userId!;
    const category = await CategoryService.update(id, name, userId);
    res.status(200).json(category);
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.userId!;
    await CategoryService.delete(id, userId);
    res.status(204).send();
  }
}
