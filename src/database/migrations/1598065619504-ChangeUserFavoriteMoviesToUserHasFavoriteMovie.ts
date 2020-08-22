import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ChangeUserFavoriteMoviesToUserHasFavoriteMovie1598065619504
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'user_favorite_movies',
      'user_favorite_movies_user_id_fkey',
    );

    await queryRunner.renameTable(
      'user_favorite_movies',
      'user_has_favorite_movie',
    );

    await queryRunner.createForeignKey(
      'user_has_favorite_movie',
      new TableForeignKey({
        name: 'user_has_favorite_movie_user_id_fkey',
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
      'user_has_favorite_movie',
      'user_has_favorite_movie_user_id_fkey',
    );

    await queryRunner.renameTable(
      'user_has_favorite_movie',
      'user_favorite_movies',
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
}
