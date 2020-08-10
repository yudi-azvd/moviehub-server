import User from '../models/User';

class UsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: Omit<User, 'id'>): Promise<User> {
    const user = new User({
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async findOne(id: string): Promise<User | undefined> {
    const user = this.users.find(u => u.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);

    return user;
  }
}

export default new UsersRepository();
