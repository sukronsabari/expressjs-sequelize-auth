import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { ApiResponseDTO } from '@/app/dtos/ApiResponseDTO';
import { SalesPersonService } from '@/app/services/SalesPersonService';
import { addSalesPersonSchema } from '@/app/schemas/AddSalesPersonSchema';

export class SalesPersonController {
  private _salesPersonService: SalesPersonService;

  constructor(salesPersonService: SalesPersonService) {
    this._salesPersonService = salesPersonService;
  }

  public index = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query?.page as string) || 1;
    const perPage = parseInt(req.query?.per_page as string) || 10;

    const salesData = await this._salesPersonService.getAllSales({
      page,
      perPage,
    });

    const response: ApiResponseDTO = {
      status: 'success',
      message: 'Sales data retrieved successfully',
      data: {
        sales: salesData.sales,
      },
      meta: salesData.meta,
    };

    res.status(200).json(response);
  });

  public store = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedPayload = addSalesPersonSchema.parse(req.body);

    await this._salesPersonService.createSalesPerson(validatedPayload);

    const response: ApiResponseDTO = {
      status: 'success',
      message: 'Sales Person created',
    };
    res.status(200).json(response);
  });
}
