import { SalesPersonController } from '@/app/controllers/sales-person/SalesPersonController';
import { authMiddleware } from '@/app/middlewares/AuthMiddleware';
import { SalesPersonRepository } from '@/app/repositories/SalesPersonRepository';
import { SalesPersonService } from '@/app/services/SalesPersonService';
import { Router } from 'express';

export const salesPersonRoutes = Router();

const salesPersonRepository = new SalesPersonRepository();
const salesPersonService = new SalesPersonService(salesPersonRepository);
const salesPersonController = new SalesPersonController(salesPersonService);

salesPersonRoutes.get('/', salesPersonController.index);
salesPersonRoutes.post('/', authMiddleware, salesPersonController.store);
