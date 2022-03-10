import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import User from '../typeorm/entities/users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface iRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateUserProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: iRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('You cannot use this e-mail');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Informed password dows not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserProfileService;
