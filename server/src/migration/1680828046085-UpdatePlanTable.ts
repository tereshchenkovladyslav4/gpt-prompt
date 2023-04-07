import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePlanTable1680828046085 implements MigrationInterface {
  name = 'UpdatePlanTable1680828046085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`plan\` CHANGE \`period\` \`period\` enum ('ALL', 'MONTHLY', 'YEARLY') NOT NULL DEFAULT 'MONTHLY'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`plan\` CHANGE \`period\` \`period\` enum ('MONTHLY', 'YEARLY') NOT NULL DEFAULT 'MONTHLY'`,
    );
  }
}
