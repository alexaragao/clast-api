import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class Login1612154258429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'Login',
          columns: [
            {
              name: 'ID',
              type: 'uniqueidentifier',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'NEWID()',
            },
            {
              name: 'Login',
              type: 'varchar',
              isUnique: true,
              isNullable: false,
            },
            {
              name: 'Password',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'Term',
              type: 'bit',
              isNullable: false,
            },
            {
              name: 'Created_at',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'Updated_at',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            }
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Login');
    }

}
