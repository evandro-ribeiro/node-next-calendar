import { connection } from "../repository/mysql.js";
import { FieldPacket, QueryError } from "mysql2";

export function clientInsertService(
  name: string,
  email: string,
  password: string
) {
  const sql = `INSERT INTO client (client_name, email, password) 
    VALUES ('${name}', '${email}', '${password}')`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    console.log("Cliente cadastrado no banco de dados com sucesso!");
  });
}

export async function clientGetService(email: string, password: string) {
  const sql = `SELECT email, password FROM client WHERE email = '${email}' AND password = '${password}'`;

  return new Promise((res, rej) => {
    connection.query(
      sql,
      (error: QueryError, results: Array<object>, fields: FieldPacket[]) => {
        if (error) rej(error);
        res(results[0]);
      }
    );
  });
}

export async function clientGetClientIdService(email: string) {
  const sql = `SELECT id FROM client c WHERE c.email = '${email}'`;

  return new Promise((res, rej) => {
    connection.query(
      sql,
      (error: QueryError, results: Array<object>, fields: FieldPacket[]) => {
        if (error) rej(error);
        res(results[0]);
      }
    );
  });
}
