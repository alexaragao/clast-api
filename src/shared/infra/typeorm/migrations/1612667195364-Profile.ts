import { ManyToMany, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Profile1612667195364 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Profile',
        columns: [
          {
            name: 'ID',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'Name',
            type: 'nvarchar(50)',
            isNullable: false,
          },
          {
            name: 'LastName',
            type: 'nvarchar(MAX)',
            isNullable: false,
          },
          {
            name: 'CPF',
            type: 'nvarchar(11)',
            isNullable: false,
          },
          {
            name: 'Birthday',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'Picture',
            type: 'nvarchar(MAX)',
            isNullable: false,
          },
          {
            name: 'Facebook',
            type: 'nvarchar(MAX)',
            isNullable: false,
          },
          {
            name: 'LinkedIn',
            type: 'nvarchar(MAX)',
            isNullable: false,
          },
          {
            name: 'Instagram',
            type: 'nvarchar(MAX)',
            isNullable: false,
          },
          {
            name: 'Twitter',
            type: 'nvarchar(MAX)',
            isNullable: false,
          },
          {
            name: 'LoginID',
            type: 'uniqueidentifier',
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
        ]
      }),
    );

    await queryRunner.createForeignKey('Profile', new TableForeignKey({
      name: 'LoginProfile',
      columnNames: ['LoginID'],
      referencedColumnNames: ['ID'],
      referencedTableName: 'Login',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Profile', 'LoginProfile');

    await queryRunner.dropTable('Profile');
  }

}
