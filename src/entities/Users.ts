import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Place from "./Place";
import Ride from "./Ride";

const BCRYPT_ROUND = 10;

@Entity()
class Users extends BaseEntity {
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;
  @Column({ type: "double precision", default: 0 })
  lastLat: number;
  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @Column({ type: "double precision", nullable: true })
  orientation: number;

  @Column({ type: "double precision", nullable: true })
  lat: number;

  @Column({ type: "double precision", nullable: true })
  lng: number;

  @OneToMany(type => Place, place => place.users)
  places: Place[];

  @ManyToOne(Type => Chat, chat => chat.participants)
  chat: Chat;

  @OneToMany(Type => Message, message => message.users)
  messages: Message[];

  @OneToMany(type => Ride, ride => ride.passenger)
  rideAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  rideAsDriver: Ride[];

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  // tslint:disable-next-line: ban-types
  public comparePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      console.log(this.password);
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
      console.log(this.password);
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUND);
  }
}

export default Users;
