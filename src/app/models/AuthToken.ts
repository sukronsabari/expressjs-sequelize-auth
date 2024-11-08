import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '@/config/database';
import { User } from './User';

export interface IAuthToken {
  id: number;
  user_id: string;
  refresh_token: string;
  expires: Date;
}

export type TAuthTokenCreation = Optional<IAuthToken, 'id'>;

export class AuthToken
  extends Model<IAuthToken, TAuthTokenCreation>
  implements IAuthToken
{
  public id: number;
  public user_id: string;
  public refresh_token: string;
  public expires: Date;
}

AuthToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: { type: DataTypes.UUID, allowNull: false },
    refresh_token: { type: DataTypes.TEXT, allowNull: false },
    expires: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: db,
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'auth_tokens',
  }
);

User.hasMany(AuthToken, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

AuthToken.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
});
