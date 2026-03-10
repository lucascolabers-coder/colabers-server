import { EntityRepository, Repository } from 'typeorm';
import Vacancy from '../entities/Vacancy';

@EntityRepository(Vacancy)
class VacanciesRepository extends Repository<Vacancy> {
  public async findById(id: string): Promise<Vacancy | undefined> {
    const vacancy = await this.findOne(id);
    return vacancy;
  }

  public async findAll(): Promise<Vacancy[]> {
    const vacancies = await this.find();
    return vacancies;
  }
}

export default VacanciesRepository;
