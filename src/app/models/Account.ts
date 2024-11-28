import { nanoid } from 'nanoid';
import { DataTypes, Model, Optional } from 'sequelize';

import { db } from '@/config/database';
import { ITimestamp } from '@/lib/types';

export interface IAccount extends ITimestamp {
  id: string;
  user_id: string;
  account_id: string;
  provider_id: string;
  access_token: string | null;
  refresh_token: string | null;
  access_token_expires_at: Date | null;
  refresh_token_expires_at: Date | null;
  scope: string | null;
  password: string | null;
}

export type TAccountCreation = Optional<
  IAccount,
  | 'id'
  | 'access_token'
  | 'refresh_token'
  | 'access_token_expires_at'
  | 'refresh_token_expires_at'
  | 'scope'
  | 'password'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
>;

export class Account extends Model<IAccount, TAccountCreation> implements IAccount {
  public id: string;
  public user_id: string;
  public account_id: string;
  public provider_id: string;
  public access_token: string | null;
  public refresh_token: string | null;
  public access_token_expires_at: Date | null;
  public refresh_token_expires_at: Date | null;
  public scope: string | null;
  public password: string | null;

  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date | null;
}

Account.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(),
      allowNull: false,
    },
    user_id: { type: DataTypes.STRING, allowNull: false },
    account_id: { type: DataTypes.STRING, allowNull: false },
    provider_id: { type: DataTypes.STRING, allowNull: false },
    access_token: { type: DataTypes.STRING, allowNull: true },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
    access_token_expires_at: { type: DataTypes.DATE, allowNull: true },
    refresh_token_expires_at: { type: DataTypes.DATE, allowNull: true },
    scope: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },

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
    tableName: 'accounts',
  }
);
