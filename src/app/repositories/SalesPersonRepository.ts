import { SalesPerson, TSalesPersonCreation } from '@/app/models/SalesPerson';

export class SalesPersonRepository {
  public all = async (page = 1, perPage = 10) => {
    try {
      const offset = (page - 1) * perPage;
      const limit = perPage;

      const { rows: sales, count: totalItems } =
        await SalesPerson.findAndCountAll({
          offset,
          limit,
          order: [['created_at', 'DESC']],
        });

      return {
        sales,
        meta: {
          pagination: {
            current_page: page,
            per_page: perPage,
            total: totalItems,
            last_page: Math.ceil(totalItems / perPage),
          },
        },
      };
    } catch (error) {
      console.error(error);
      return {
        sales: [],
        meta: {
          pagination: {
            current_page: page,
            per_page: perPage,
            total: 0,
            last_page: 0,
          },
        },
      };
    }
  };

  public create = async (payload: TSalesPersonCreation) => {
    try {
      const salesPerson = await SalesPerson.create({
        name: payload.name,
      });

      return salesPerson;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
