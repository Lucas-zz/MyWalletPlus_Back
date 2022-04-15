import { Router } from 'express';
import authRouter from './authRouter.js';
import financeRouter from './financeRouter.js';

const router = Router();

router.use(authRouter);
router.use(financeRouter);

export default router;