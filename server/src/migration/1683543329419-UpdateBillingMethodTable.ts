import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBillingMethodTable1683543329419 implements MigrationInterface {
  name = 'UpdateBillingMethodTable1683543329419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`billing_method\` ADD \`customerId\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`billing_method\` DROP COLUMN \`customerId\``);
  }
}
