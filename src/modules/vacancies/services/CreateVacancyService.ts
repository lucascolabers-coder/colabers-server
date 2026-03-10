import { getCustomRepository } from 'typeorm';
import Vacancy from '../typeorm/entities/Vacancy';
import VacanciesRepository from '../typeorm/repositories/VacanciesRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  title: string;
  description: string;
  requirements: string;
  user_id: string;
}

class CreateVacancyService {
  public async execute({
    title,
    description,
    requirements,
    user_id,
  }: IRequest): Promise<Vacancy> {
    const vacanciesRepository = getCustomRepository(VacanciesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const vacancy = vacanciesRepository.create({
      title,
      description,
      requirements,
      user_id,
      interested_users: [],
    });

    await vacanciesRepository.save(vacancy);

    return vacancy;
  }
}

export default CreateVacancyService;
