import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBillingMethodTable1683232087178 implements MigrationInterface {
  name = 'CreateBillingMethodTable1683232087178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_6b6d0e4dc88105a4a11103dd2cd\``);
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cc906b4bc892b048f1b654d2aa0\``);
    await queryRunner.query(`ALTER TABLE \`template\` DROP FOREIGN KEY \`FK_5e718539594d02a4c75ddc1ca56\``);
    await queryRunner.query(
      `CREATE TABLE \`billing_method\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`name\` varchar(255) NULL, \`expireAt\` datetime NULL, \`address\` varchar(255) NULL, \`paymentMethodId\` varchar(255) NULL, \`cardCountry\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`plan\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`plan\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`discount\` \`discount\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`paidAt\` \`paidAt\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`expiresAt\` \`expiresAt\` datetime NULL`);
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`gracePeriodStartAt\` \`gracePeriodStartAt\` datetime NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`cancelledAt\` \`cancelledAt\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`lastModifiedAt\` \`lastModifiedAt\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`template\` CHANGE \`title\` \`title\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`template\` CHANGE \`content\` \`content\` text NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cc906b4bc892b048f1b654d2aa0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_6b6d0e4dc88105a4a11103dd2cd\` FOREIGN KEY (\`planId\`) REFERENCES \`plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`template\` ADD CONSTRAINT \`FK_5e718539594d02a4c75ddc1ca56\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`billing_method\` ADD CONSTRAINT \`FK_9dc219dd7a7af5ee363ecbf33ff\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`billing_method\` DROP FOREIGN KEY \`FK_9dc219dd7a7af5ee363ecbf33ff\``);
    await queryRunner.query(`ALTER TABLE \`template\` DROP FOREIGN KEY \`FK_5e718539594d02a4c75ddc1ca56\``);
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_6b6d0e4dc88105a4a11103dd2cd\``);
    await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_cc906b4bc892b048f1b654d2aa0\``);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`template\` CHANGE \`content\` \`content\` text NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`template\` CHANGE \`title\` \`title\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`lastModifiedAt\` \`lastModifiedAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`cancelledAt\` \`cancelledAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`gracePeriodStartAt\` \`gracePeriodStartAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` CHANGE \`expiresAt\` \`expiresAt\` datetime NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`paidAt\` \`paidAt\` datetime NULL DEFAULT 'NULL'`);
    await queryRunner.query(`ALTER TABLE \`subscription\` CHANGE \`discount\` \`discount\` int NULL DEFAULT 'NULL'`);
    await queryRunner.query(
      `ALTER TABLE \`plan\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`plan\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT 'NULL'`);
    await queryRunner.query(`DROP TABLE \`billing_method\``);
    await queryRunner.query(
      `ALTER TABLE \`template\` ADD CONSTRAINT \`FK_5e718539594d02a4c75ddc1ca56\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_cc906b4bc892b048f1b654d2aa0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_6b6d0e4dc88105a4a11103dd2cd\` FOREIGN KEY (\`planId\`) REFERENCES \`plan\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }
}
