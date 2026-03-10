import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import VacanciesRepository from '../typeorm/repositories/VacanciesRepository';
import Vacancy from '../typeorm/entities/Vacancy';

class ShowVacancyService {
  public async execute(id: string): Promise<Vacancy | undefined> {
    const vacanciesRepository = getCustomRepository(VacanciesRepository);

    const vacancies = await vacanciesRepository.findById(id);

    if (!vacancies) {
      throw new AppError('Vacancy does not exist');
    }

    return vacancies;
  }
}

export default ShowVacancyService;
