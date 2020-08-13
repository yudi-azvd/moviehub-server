import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const { email, password } = request.body;

    const existingUser = await usersRepository.findByEmail(email);

    if (!existingUser) {
      throw new AppError('Wrong email and password combination');
    }

    if (existingUser.password !== password) {
      throw new AppError('Wrong email and password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(existingUser.id),
      expiresIn,
    });

    return response.json({ user: existingUser, token });
  }
}

export default new SessionController();
