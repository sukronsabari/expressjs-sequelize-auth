import bcrypt from 'bcryptjs';
import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/config/database';
import { ITimestamp } from '@/lib/types';

export interface IUser extends ITimestamp {
  id: string;
  name: string;
  email: string;
  email_verified: Date | null;
  image: string | null;
  password: string | null;
}

export type TUserCreation = Optional<IUser, 'id' | 'email_verified' | 'image' | 'password' | 'created_at' | 'updated_at' | 'deleted_at'>;

export class User extends Model<IUser, TUserCreation> implements IUser {
  public id: string;
  public name!: string;
  public email: string;
  public email_verified: Date | null;
  public image: string | null;
  public password: string | null;

  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => `user-${uuidv4()}`,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    email_verified: { type: DataTypes.DATE, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: true },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value: string) {
        const hashedPassword = bcrypt.hashSync(value, 10);

        this.setDataValue('password', hashedPassword);
      },
    },
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
