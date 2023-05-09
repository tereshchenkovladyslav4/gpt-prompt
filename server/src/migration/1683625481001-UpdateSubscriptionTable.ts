import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSubscriptionTable1683625481001 implements MigrationInterface {
  name = 'UpdateSubscriptionTable1683625481001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`status\` \`status\` enum ('active', 'trialing', 'active_grace_period', 'inactive', 'expired', 'canceled') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`status\` \`status\` enum ('active', 'active_grace_period', 'inactive', 'expired', 'cancelled') NOT NULL`,
    );
  }
}
