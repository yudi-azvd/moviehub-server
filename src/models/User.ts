import shortid from 'shortid';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  constructor({ name, email, password }: Omit<User, 'id'>) {
    this.id = shortid.generate();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;
