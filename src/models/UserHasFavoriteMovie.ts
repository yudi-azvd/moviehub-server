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
}

export default UserHasFavoriteMovie;
