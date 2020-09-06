import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Member } from "./Member";
import { Service } from "./Service";

@Entity({ name: "branches" })
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Index({ unique: true })
  name: string;
  @OneToMany((type) => Member, (member) => member.branch)
  members: Member[];
  @OneToMany((type) => Service, (service) => service.branch)
  services: Service[];
}
