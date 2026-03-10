import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class DeleteUserService {
  public async execute(id: string, requester_id: string): Promise<void> {
    if (id !== requester_id) {
      throw new AppError('You can only delete your own user', 403);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    await usersRepository.delete(id);
  }
}

export default DeleteUserService;
