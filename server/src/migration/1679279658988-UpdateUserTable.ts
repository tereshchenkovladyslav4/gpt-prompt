import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1679279658988 implements MigrationInterface {
  name = 'UpdateUserTable1679279658988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
  }
}
