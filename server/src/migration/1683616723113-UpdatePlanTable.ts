import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePlanTable1683616723113 implements MigrationInterface {
  name = 'UpdatePlanTable1683616723113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`plan\` ADD \`stripePlanId\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`plan\` DROP COLUMN \`stripePlanId\``);
  }
}
