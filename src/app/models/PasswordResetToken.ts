import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '@/config/database';

export interface IPasswordResetToken {
  id: number;
  email: string;
  token: string;
  expires: Date;
}

export type TPasswordResetTokenCreation = Optional<IPasswordResetToken, 'id'>;

export class PasswordResetToken extends Model<IPasswordResetToken, TPasswordResetTokenCreation> implements IPasswordResetToken {
  public id: number;
  public email: string;
  public token: string;
  public expires: Date;
}

PasswordResetToken.init(
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
    paranoid: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'password_reset_tokens',
    indexes: [
      {
        unique: true,
        fields: ['email', 'token'],
      },
    ],
  }
);
