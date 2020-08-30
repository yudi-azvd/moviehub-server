import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const { name, email, password } = request.body;

    const existingUserWithEmail = await usersRepository.findByEmail(email);

    if (existingUserWithEmail) {
      throw new AppError('Email já está sendo usado.');
    }

    const user = await usersRepository.create({ name, email, password });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const { id } = request.params;

    const user = await usersRepository.findById(parseInt(id, 10));

    return response.json(user);
  }
}

export default UserController;
