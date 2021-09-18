import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateIssues1631761820830 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'issues',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'subject',
                        type: 'varchar',
                    },
                    {
                        name: 'solicitation',
                        type: 'varchar',
                    },
                    {
                        name: 'solution',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                    },
                    {
                        name: 'usercontact',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('issues');
    }
}
