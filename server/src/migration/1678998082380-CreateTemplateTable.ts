import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTemplateTable1678998082380 implements MigrationInterface {
  name = 'CreateTemplateTable1678998082380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`template\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`content\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`template\``);
  }
}
