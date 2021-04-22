import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUserTokens1614657848185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'User_Tokens',
        columns: [
          {
            name: 'ID',
            type: 'uniqueidentifier',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'Token',
            type: 'uniqueidentifier',
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'User_id',
            type: 'uniqueidentifier',
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
        foreignKeys: [
          {
            name: 'TokenUser',
            referencedTableName: 'Login',
            referencedColumnNames: ['ID'],
            columnNames: ['User_Id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("User_Tokens");
    }

}
