import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const listUser = new ListUserService();

    const user = await listUser.execute(user_id);

    return res.json(instanceToInstance(user));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const requester_id = req.user.id;

    const showUser = new ShowUserService();

    const user = await showUser.execute(id, requester_id);

    return res.json(instanceToInstance(user));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return res.status(201).json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, user_type, user_objective, password, old_password } =
      req.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      user_type,
      user_objective,
      password,
      old_password,
    });

    return res.json(instanceToInstance(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const requester_id = req.user.id;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(id, requester_id);

    return res.status(204).send();
  }
}
