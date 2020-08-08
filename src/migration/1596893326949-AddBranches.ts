import { MigrationInterface, QueryRunner } from "typeorm";
import { Branch } from "../entity/Branch";

export class AddBranches1596893326949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let branchOne = new Branch();
    branchOne.name = "CE 1";
    let branchTwo = new Branch();
    branchTwo.name = "CE 2";
    let branchThree = new Branch();
    branchThree.name = "CE 3";

    await branchOne.save();
    await branchTwo.save();
    await branchThree.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
