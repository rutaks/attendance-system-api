import { AES } from "crypto-ts";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import config from "../configs/config";
import { Branch } from "./Branch";
import { Fellowship } from "./Fellowship";

@Entity({ name: "members" })
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true, unique: true })
  phoneNumber: string;
  @Column({ nullable: true, unique: true })
  email: string;
  @Column({ nullable: true, unique: true })
  nationalId: string;
  @Column({ nullable: true, unique: true })
  passportId: string;
  @Column({ nullable: true })
  location: string;

  @ManyToOne((type) => Fellowship, (fellowship) => fellowship.members, {
    eager: true,
  })
  fellowship: Fellowship;

  @ManyToOne((type) => Branch, (branch) => branch.members, { eager: true })
  branch: Branch;

  @BeforeInsert()
  encryptPersonalInfos() {
    this.nationalId = AES.encrypt(
      this.nationalId,
      config.encryptKey
    ).toString();
    this.passportId = AES.encrypt(
      this.passportId,
      config.encryptKey
    ).toString();
  }
}
