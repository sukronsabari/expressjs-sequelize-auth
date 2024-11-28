import { DataTypes, Model, Optional } from 'sequelize';
import { nanoid } from 'nanoid';

import { db } from '@/config/database';
import { ITimestamp } from '@/lib/types';

export interface IUser extends ITimestamp {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  image: string | null;
}

export type TUserCreation = Optional<IUser, 'id' | 'email_verified' | 'image' | 'created_at' | 'updated_at' | 'deleted_at'>;

export class User extends Model<IUser, TUserCreation> implements IUser {
  public id: string;
  public name!: string;
  public email: string;
  public email_verified: boolean;
  public image: string | null;

  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    email_verified: { type: DataTypes.BOOLEAN, allowNull: false },
    image: { type: DataTypes.TEXT, allowNull: true },

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
    tableName: 'users',
  }
);
