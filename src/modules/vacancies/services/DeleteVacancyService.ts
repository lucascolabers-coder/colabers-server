import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import VacanciesRepository from '../typeorm/repositories/VacanciesRepository';

class DeleteVacancyService {
  public async execute(id: string, requester_id: string): Promise<void> {
    const vacanciesRepository = getCustomRepository(VacanciesRepository);

    const vacancy = await vacanciesRepository.findById(id);

    if (!vacancy) {
      throw new AppError('Vacancy does not exist', 404);
    }

    if (vacancy.user_id !== requester_id) {
      throw new AppError('You can only delete your own vacancy', 403);
    }

    await vacanciesRepository.delete(id);
  }
}

export default DeleteVacancyService;
