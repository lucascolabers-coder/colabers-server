import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import VacanciesRepository from '../typeorm/repositories/VacanciesRepository';

class DeleteVacancyService {
  public async execute(id: string): Promise<void> {
    const vacanciesRepository = getCustomRepository(VacanciesRepository);

    const vacancy = await vacanciesRepository.findById(id);

    if (!vacancy) {
      throw new AppError('Vacancy does not exist');
    }

    await vacanciesRepository.delete(id);
  }
}

export default DeleteVacancyService;
