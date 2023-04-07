import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlanTable1680827223545 implements MigrationInterface {
  name = 'CreatePlanTable1680827223545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`plan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` enum ('gpt_free', 'gpt_stater_monthly', 'gpt_stater_yearly', 'gpt_pro_monthly', 'gpt_pro_yearly') NOT NULL DEFAULT 'gpt_free', \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`period\` enum ('MONTHLY', 'YEARLY') NOT NULL DEFAULT 'MONTHLY', \`price\` int NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_e405cbb23fb08931a48ad8c2bd\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_e405cbb23fb08931a48ad8c2bd\` ON \`plan\``);
    await queryRunner.query(`DROP TABLE \`plan\``);
  }
}
