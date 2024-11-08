import { SalesPersonRepository } from '@/app/repositories/SalesPersonRepository';
import { AddSalePersonDTO } from '../dtos/sales-person/AddSalePersonDTO';
export class SalesPersonService {
  private _salesPersonRepository: SalesPersonRepository;

  constructor(salesPersonRepository: SalesPersonRepository) {
    this._salesPersonRepository = salesPersonRepository;
  }

  public getAllSales = async (params?: { perPage?: number; page?: number }) => {
    const sales = await this._salesPersonRepository.all(
      params?.page,
      params?.perPage
    );

    return sales;
  };

  public createSalesPerson = async (payload: AddSalePersonDTO) => {
    await this._salesPersonRepository.create(payload);
  };
}
