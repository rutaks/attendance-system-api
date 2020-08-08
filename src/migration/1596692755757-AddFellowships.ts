import { Fellowship } from "./../entity/Fellowship";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFellowships1596692755757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let teens = new Fellowship("Teens");
    let singles = new Fellowship("Singles");
    let professionals = new Fellowship("Professionals");
    let men = new Fellowship("Men");
    let women = new Fellowship("Women");
    let haven = new Fellowship("Haven");
    let havenMillenial = new Fellowship("Haven Millenial");

    await teens.save();
    await singles.save();
    await professionals.save();
    await men.save();
    await women.save();
    await haven.save();
    await havenMillenial.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
