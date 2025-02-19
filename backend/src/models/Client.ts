import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Event } from "./Event.js";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  client_name!: string;

  @Column("varchar", { length: 100 })
  email!: string;

  @Column("varchar", { length: 100 })
  password!: string;

  @OneToMany((type) => Event, (event) => event.client)
  events!: Promise<Event[]>;
}
