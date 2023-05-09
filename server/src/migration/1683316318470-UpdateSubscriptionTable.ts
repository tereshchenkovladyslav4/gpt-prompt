import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSubscriptionTable1683316318470 implements MigrationInterface {
  name = 'UpdateSubscriptionTable1683316318470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`paymentError\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`subscription\` ADD \`paymentErrorCode\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`paymentErrorCode\``);
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP COLUMN \`paymentError\``);
  }
}
