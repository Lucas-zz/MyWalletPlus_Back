import { Router } from 'express';
import { getFinancialEvents, getFinancialEventsSum, postFinancialEvent } from '../controllers/financeController.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';

const financeRouter = Router();

financeRouter.post("/financial-events", validateTokenMiddleware, postFinancialEvent);
financeRouter.get("/financial-events", validateTokenMiddleware, getFinancialEvents);
financeRouter.get("/financial-events/sum", validateTokenMiddleware, getFinancialEventsSum);

export default financeRouter;