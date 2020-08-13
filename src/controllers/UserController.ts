import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { name, email, password } = request.body;

    const user = await usersRepository.create({ name, email, password });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { id } = request.params;

    const user = await usersRepository.findOne(parseInt(id, 10));

    return response.json(user);
  }
}

export default UserController;
