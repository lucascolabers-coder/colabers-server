import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  user_type: string;
  user_objective: string;
  password?: string;
  old_password?: string;
}

class UpdateUserService {
  public async execute({
    user_id,
    name,
    email,
    user_type,
    user_objective,
    password,
    old_password,
  }: IRequest): Promise<Partial<User>> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) throw new AppError('Old password does not match');

      const checkNowPassword = await compare(password, user.password);

      if (checkNowPassword) {
        throw new AppError('This password has already been used.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    user.user_type = user_type;
    user.user_objective = user_objective;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
