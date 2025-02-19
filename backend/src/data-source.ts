import { DataSource } from "typeorm";
import { Client } from "./models/Client.js";
import { Event } from "./models/Event.js";

const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  username: "root",
  password: "root",
  database: "calendar",
  entities: [Client, Event],
  synchronize: true,
  logging: true,
});

export default function initializerAppSourceData() {
  AppDataSource.initialize()
    .then(async (connection) => {
      console.log("Banco de dados conectado");

      // Sincroniza as tabelas
      await connection.synchronize();
      console.log("Tabelas sincronizadas");
    })
    .catch((error) => console.log("Erro de conexão:", error));
}
