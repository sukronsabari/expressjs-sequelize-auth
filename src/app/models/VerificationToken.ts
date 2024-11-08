import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '@/config/database';

export interface IVerificationToken {
  id: number;
  email: string;
  token: string;
  expires: Date;
}

export type TVerificationTokenCreation = Optional<IVerificationToken, 'id'>;

export class VerificationToken
  extends Model<IVerificationToken, TVerificationTokenCreation>
  implements IVerificationToken
{
  public id: number;
  public email: string;
  public token: string;
  public expires: Date;
}

VerificationToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.TEXT, allowNull: false, unique: true },
    expires: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: db,
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'verification_tokens',
    indexes: [
      {
        unique: true,
        fields: ['email', 'token'],
      },
    ],
  }
);
