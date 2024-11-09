import { TUserCreation, User } from '@/app/models/User';

/**
 * all() - untuk mengambil semua data
  find($id) - untuk mencari data berdasarkan ID
  create(array $data) - untuk membuat data baru
  update($id, array $data) - untuk memperbarui data
  delete($id) - untuk menghapus data
  findBy($field, $value) - untuk mencari berdasarkan field tertentu
 */
export class UserRepository {
  public create = async (payload: TUserCreation) => {
    try {
      const newUser = await User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password, // hashing automatically using setter
      });

      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public activateUser = async (email: string) => {
    try {
      const updatedUser = await User.update(
        {
          email_verified: new Date(),
        },
        { where: { email }, returning: true }
      );

      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };

  public changePassword = async (email: string, password: string) => {
    try {
      const updatedUser = await User.update(
        {
          password,
        },
        { where: { email }, returning: true }
      );

      return updatedUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public findByEmail = async (email: string) => {
    try {
      const user = await User.findOne({
        where: { email },
      });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
