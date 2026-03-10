import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    await usersRepository.delete(id);
  }
}

export default DeleteUserService;
