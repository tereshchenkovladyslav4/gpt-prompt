import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTemplateTable1680093087191 implements MigrationInterface {
  name = 'UpdateTemplateTable1680093087191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`template\` ADD \`private\` tinyint NOT NULL DEFAULT 1`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`template\` DROP FOREIGN KEY \`FK_5e718539594d02a4c75ddc1ca56\``);
  }
}
