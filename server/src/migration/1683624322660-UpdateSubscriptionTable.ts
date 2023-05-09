import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSubscriptionTable1683624322660 implements MigrationInterface {
  name = 'UpdateSubscriptionTable1683624322660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`stripeSubscriptionId\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`stripeSubscriptionId\``);
  }
}
