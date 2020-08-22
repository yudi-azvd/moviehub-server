import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import Movie from './Movie';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  favoriteMovies?: Movie[];
}

export default User;
