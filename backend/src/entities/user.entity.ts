import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Trip } from "./trip.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  bio: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @OneToMany(() => Trip, (trip) => trip.user, { cascade: true })
  trips: Trip[];
}
