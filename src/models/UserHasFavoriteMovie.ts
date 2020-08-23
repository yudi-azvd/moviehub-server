import { PrimaryColumn, Index, Entity } from 'typeorm';

@Entity()
@Index((relationship: UserHasFavoriteMovie) => [
  relationship.movie_id,
  relationship.user_id,
])
class UserHasFavoriteMovie {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  movie_id: number;

  constructor(user_id: number, movie_id: number) {
    this.user_id = user_id;
    this.movie_id = movie_id;
  }
}

export default UserHasFavoriteMovie;
