import { DataTypes, Model, Optional } from 'sequelize';
import { nanoid } from 'nanoid';

import { db } from '@/config/database';
import { ITimestamp } from '@/lib/types';

export interface IVerification extends ITimestamp {
  id: string;
  identifier: string;
  value: string;
  expires_at: Date;
}

export type TVerificationCreation = Optional<IVerification, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

export class Verification extends Model<IVerification, TVerificationCreation> implements IVerification {
  public id: string;
  public identifier: string;
  public value: string;
  public expires_at: Date;

  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date | null;
}

Verification.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(),
      allowNull: false,
    },
    identifier: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },

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
    tableName: 'verifications',
  }
);
