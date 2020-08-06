import { User } from "./../entity/User";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminUser1595871429404 implements MigrationInterface {
  name = "CreateAdminUser1595871429404";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    // );
    let admin = new User("Admin", "One", "admin_1", "Test123!", "ADMIN");
    admin.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
