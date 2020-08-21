import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUserFavoriteMovies1597980500970
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_favorite_movies',
        columns: [
          {
            name: 'user_id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'movie_id',
            type: 'serial',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user_favorite_movies',
      new TableForeignKey({
        name: 'user_favorite_movies_user_id_fkey',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'user_favorite_movies',
      'user_favorite_movies_user_id_fkey',
    );

    await queryRunner.dropTable('user_favorite_movies');
  }
}
