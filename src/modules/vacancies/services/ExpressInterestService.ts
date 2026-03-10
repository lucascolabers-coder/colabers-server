import { getCustomRepository } from 'typeorm';
import VacanciesRepository from '../typeorm/repositories/VacanciesRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  vacancy_id: string;
  user_id: string;
}

class ExpressInterestService {
  public async execute({ vacancy_id, user_id }: IRequest): Promise<void> {
    const vacanciesRepository = getCustomRepository(VacanciesRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    const vacancy = await vacanciesRepository.findById(vacancy_id);
    const user = await usersRepository.findById(user_id);

    if (!vacancy) {
      throw new AppError('Vacancy not found', 404);
    }

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (vacancy.user_id === user_id) {
      throw new AppError('You cannot apply to your own vacancy', 403);
    }

    vacancy.interested_users = vacancy.interested_users || [];

    const isUserInterested = vacancy.interested_users.some(
      interestedUser => String(interestedUser.id) === String(user_id),
    );

    if (isUserInterested) {
      throw new AppError('User is already interested in this vacancy', 409);
    }

    if (!isUserInterested) {
      vacancy.interested_users.push({ id: user.id, email: user.email });
      await vacanciesRepository.save(vacancy);
    }
  }
}

export default ExpressInterestService;
