import { AuthToken, TAuthTokenCreation } from '@/app/models/AuthToken';

export class AuthTokenRepository {
  public create = async (payload: TAuthTokenCreation) => {
    try {
      const authToken = await AuthToken.create({
        user_id: payload.user_id,
        refresh_token: payload.refresh_token,
        expires: payload.expires,
      });

      return authToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public findActiveToken = async (userId: string, refreshToken: string) => {
    try {
      const authToken = await AuthToken.findOne({
        where: { user_id: userId, refresh_token: refreshToken },
      });

      return authToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
