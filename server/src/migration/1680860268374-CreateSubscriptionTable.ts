import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptionTable1680860268374 implements MigrationInterface {
  name = 'CreateSubscriptionTable1680860268374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`planId\` int NOT NULL, \`amount\` int NOT NULL, \`vatAmount\` int NOT NULL, \`discount\` int NULL, \`billingSchema\` enum ('ALL', 'MONTHLY', 'YEARLY') NOT NULL, \`status\` enum ('active', 'active_grace_period', 'inactive', 'expired', 'cancelled') NOT NULL, \`paymentStatus\` enum ('paid', 'not_paid', 'error') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`paidAt\` datetime NULL, \`expiresAt\` datetime NULL, \`gracePeriodStartAt\` datetime NULL, \`cancelledAt\` datetime NULL, \`lastModifiedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cc906b4bc892b048f1b654d2aa0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_6b6d0e4dc88105a4a11103dd2cd\` FOREIGN KEY (\`planId\`) REFERENCES \`plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_6b6d0e4dc88105a4a11103dd2cd\``);
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cc906b4bc892b048f1b654d2aa0\``);
    await queryRunner.query(`DROP TABLE \`subscription\``);
  }
}
