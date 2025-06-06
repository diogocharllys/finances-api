import { Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { AuthRequest } from '../middlewares/auth';

export class TransactionController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    console.log(req.body);
    const { title, amount, type, categoryId } = req.body;
    const userId = req.userId!;
    const transaction = await TransactionService.create({ title, amount, type, categoryId, userId });
    res.status(201).json(transaction);
  }

  static async list(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const transactions = await TransactionService.list(userId);
    res.json(transactions);
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const { id } = req.params;
    const transaction = await TransactionService.getById(id, userId);
    if (!transaction) res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    console.log(req.body);
    const userId = req.userId!;
    const { id } = req.params;
    await TransactionService.update(id, userId, req.body);
    const transaction = await TransactionService.getById(id, userId);
    if (!transaction) res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(transaction);
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.userId!;
    const { id } = req.params;
    const deleted = await TransactionService.delete(id, userId);
    res.sendStatus(deleted.count ? 204 : 404);
  }
}
