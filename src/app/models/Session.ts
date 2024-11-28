import { DataTypes, Model, Optional } from 'sequelize';
import { nanoid } from 'nanoid';

import { db } from '@/config/database';
import { ITimestamp } from '@/lib/types';

export interface ISession extends ITimestamp {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  ip_address: string | null;
  user_agent: string | null;
}

export type TSessionCreation = Optional<ISession, 'id' | 'ip_address' | 'user_agent' | 'created_at' | 'updated_at' | 'deleted_at'>;

export class Session extends Model<ISession, TSessionCreation> implements ISession {
  public id: string;
  public user_id: string;
  public token: string;
  public expires_at: Date;
  public ip_address: string | null;
  public user_agent: string | null;

  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date | null;
}

Session.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(),
      allowNull: false,
    },
    user_id: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    ip_address: { type: DataTypes.STRING, allowNull: true },
    user_agent: { type: DataTypes.STRING, allowNull: true },

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
    tableName: 'user_sessions',
  }
);
