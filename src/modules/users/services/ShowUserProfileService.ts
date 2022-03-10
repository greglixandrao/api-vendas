import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface iRequest {
  user_id: string;
}
class ShowUserProfileService {
  public async execute({ user_id }: iRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}

export default ShowUserProfileService;
