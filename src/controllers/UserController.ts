import { Request, Response } from 'express';

import usersRepository from '../repositories/UsersRepository';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = await usersRepository.create({ name, email, password });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = await usersRepository.findOne(id);

    return response.json(user);
  }
}

export default new UserController();
