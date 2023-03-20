import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTemplateTable1679322876482 implements MigrationInterface {
  name = 'UpdateTemplateTable1679322876482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`template\` ADD \`userId\` int NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`template\` ADD CONSTRAINT \`FK_5e718539594d02a4c75ddc1ca56\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`template\` DROP FOREIGN KEY \`FK_5e718539594d02a4c75ddc1ca56\``);
    await queryRunner.query(`ALTER TABLE \`template\` DROP COLUMN \`userId\``);
  }
}
