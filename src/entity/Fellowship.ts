import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Member } from "./Member";

@Entity({ name: "fellowships" })
export class Fellowship extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fellowshipName: string;
  @OneToOne((type) => Member)
  @JoinColumn()
  leader: Member;
  @OneToMany((type) => Member, (member) => member.fellowship)
  members: Member[];

  constructor(
    fellowshipName?: string,
    id?: number,
    leader?: Member,
    members?: Member[]
  ) {
    super();
    this.fellowshipName = fellowshipName;
    this.id = id;
    this.leader = leader;
    this.members = members;
  }
}
