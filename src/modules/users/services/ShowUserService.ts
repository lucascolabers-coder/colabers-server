import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { IUser } from '../models/IUser';

class ShowUserService {
  public async execute(id: string): Promise<IUser | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return user;
  }
}

export default ShowUserService;
