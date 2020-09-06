import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branch } from "./Branch";
import { Member } from "./Member";

@Entity({ name: "services" })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  title: string;
  @Column()
  startTime: Date;
  @Column()
  endTime: Date;
  @ManyToMany((type) => Member)
  @JoinTable()
  members: Member[];
  @ManyToOne((type) => Branch, (branch) => branch.services)
  branch: Branch;
  @Column({ default: false })
  deteled: Boolean;

  isDeleted() {
    return this.deteled;
  }
}
