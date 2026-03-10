import { Request, Response } from 'express';
import CreateVacancyService from '../services/CreateVacancyService';
import ListVacanciesService from '../services/ListVacanciesService';
import ExpressInterestService from '../services/ExpressInterestService';
import DeleteVacancyService from '../services/DeleteVacancyService';
import ShowVacancyService from '../services/ShowVacancyService';

class VacanciesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listVacancies = new ListVacanciesService();

    const vacancies = await listVacancies.execute();

    return res.json(vacancies);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showVacancy = new ShowVacancyService();

    const user = await showVacancy.execute(id);

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, description, requirements } = req.body;
    const user_id = req.user.id;

    const createVacancy = new CreateVacancyService();

    const vacancy = await createVacancy.execute({
      title,
      description,
      requirements,
      user_id,
    });

    return res.status(201).json(vacancy);
  }

  public async apply(req: Request, res: Response): Promise<Response> {
    const { vacancy_id } = req.body;
    const user_id = req.user.id;

    const expressInterest = new ExpressInterestService();

    await expressInterest.execute({
      vacancy_id,
      user_id,
    });

    return res.status(204).send();
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const requester_id = req.user.id;

    const deleteVacancy = new DeleteVacancyService();

    await deleteVacancy.execute(id, requester_id);

    return res.status(204).send();
  }
}

export default VacanciesController;
