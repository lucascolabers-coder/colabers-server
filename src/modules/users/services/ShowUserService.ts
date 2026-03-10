import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { IUser } from '../models/IUser';

class ShowUserService {
  public async execute(id: string, requester_id: string): Promise<IUser | undefined> {
    if (id !== requester_id) {
      throw new AppError('You can only view your own user', 403);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    return user;
  }
}

export default ShowUserService;
