import { getCustomRepository } from 'typeorm';
import Vacancy from '../typeorm/entities/Vacancy';
import VacanciesRepository from '../typeorm/repositories/VacanciesRepository';

class ListVacanciesService {
  public async execute(): Promise<Vacancy[]> {
    const vacanciesRepository = getCustomRepository(VacanciesRepository);

    const vacancies = await vacanciesRepository.findAll();

    return vacancies;
  }
}

export default ListVacanciesService;
