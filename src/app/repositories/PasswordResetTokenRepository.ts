import { v4 as uuidv4 } from 'uuid';
import { PasswordResetToken } from '@/app/models/PasswordResetToken';

export class PasswordResetTokenRepository {
  public generate = async (email: string) => {
    try {
      const token = uuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000);

      const existingToken = await PasswordResetToken.findOne({
        where: { email },
      });

      if (existingToken) {
        await PasswordResetToken.destroy({
          where: {
            id: existingToken.id,
          },
        });
      }

      const passwordResetToken = await PasswordResetToken.create({
        email,
        token,
        expires,
      });

      return passwordResetToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public findByToken = async (token: string) => {
    try {
      const passwordResetToken = await PasswordResetToken.findOne({
        where: { token },
      });

      return passwordResetToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public destroy = async (id: number) => {
    try {
      await PasswordResetToken.destroy({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  };
}
