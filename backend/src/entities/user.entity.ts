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

  @Column({ type: "varchar", length: 255 })
  fullName: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @OneToMany(() => Trip, (trip) => trip.user, { cascade: true })
  trips: Trip[];
}
