import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '@/config/database';
import { ITimestamp } from '@/lib/types';

export interface ISalesPerson extends ITimestamp {
  id: string;
  name: string;
}

export type TSalesPersonCreation = Optional<
  ISalesPerson,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

export class SalesPerson
  extends Model<ISalesPerson, TSalesPersonCreation>
  implements ISalesPerson
{
  public id: string;
  public name: string;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date | null;
}

SalesPerson.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize: db,
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'sales_persons',
  }
);
