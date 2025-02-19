import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "./Client.js";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  event_id!: number;

  @Column("varchar")
  event_name!: string;

  @Column("varchar")
  event_start_date!: Date;

  @Column("varchar")
  event_end_date!: Date;

  // chamado de clientId no banco de dados
  @ManyToOne((type) => Client, (client) => client.events)
  client!: Promise<Client>;
}
