import { Repository, getRepository } from 'typeorm';

import User from '../models/User';

class UsersRepository {
  private ormRepository: Repository<User>;

  private users: User[] = [];

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: Omit<User, 'id'>): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    // const user = await this.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async findOne(id: number): Promise<User | undefined> {
    const user = this.users.find(u => u.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);

    return user;
  }
}

export default UsersRepository;
