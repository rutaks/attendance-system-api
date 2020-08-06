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
import { Fellowship } from "./Fellowship";

@Entity({ name: "members" })
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  nationalId: string;
  @Column({ nullable: true })
  passportId: string;

  @ManyToOne((type) => Fellowship, (fellowship) => fellowship.members)
  fellowship: Fellowship;

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
