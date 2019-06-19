import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { verificationTarget } from "../types/types";
import Users from "./Users";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target: verificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @ManyToOne(type => Users, users => users.verifications)
  users: Users;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === EMAIL) {
      this.key = Math.random()
        .toString()
        .substr(2);
    }
  }
}

export default Verification;
