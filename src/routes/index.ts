import { Router } from 'express';
import categoryRoutes from './category.routes';
import transactionRoutes from './transaction.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', transactionRoutes);

export default router;
