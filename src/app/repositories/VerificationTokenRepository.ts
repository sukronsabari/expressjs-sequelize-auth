import { v4 as uuidv4 } from 'uuid';
import { VerificationToken } from '@/app/models/VerificationToken';

export class VerificationTokenRepository {
  public generate = async (email: string) => {
    try {
      const token = uuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000);

      const existingToken = await VerificationToken.findOne({
        where: { email },
      });

      if (existingToken) {
        await VerificationToken.destroy({
          where: {
            id: existingToken.id,
          },
        });
      }

      const verficationToken = await VerificationToken.create({
        email,
        token,
        expires,
      });

      return verficationToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public findByToken = async (token: string) => {
    try {
      const verificationToken = await VerificationToken.findOne({
        where: { token },
      });

      return verificationToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public destroy = async (id: number) => {
    try {
      await VerificationToken.destroy({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  };
}
