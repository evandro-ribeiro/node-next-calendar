import { FieldPacket, QueryError } from "mysql2";
import { connection } from "../repository/mysql.js";

export function eventInsertService(
  nameEvent: string,
  startEvent: string,
  endEvent: string
) {
  const sql = `INSERT INTO event (event_name, event_start_date, event_end_date) 
    VALUES ('${nameEvent}', '${startEvent}', '${endEvent}')`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    console.log("Evento cadastrado no banco de dados com sucesso!");
  });
}

export async function eventGetAllService(id: number) {
  const sql = `SELECT e.event_name, e.event_start_date, e.event_end_date, e.event_id FROM event e JOIN client c ON e.clientId = c.id WHERE id = '${id}'`;

  return new Promise((res, rej) => {
    connection.query(
      sql,
      (error: QueryError, results: Array<object>, fields: FieldPacket[]) => {
        if (error) rej(error);
        res(results);
      }
    );
  });
}

export async function eventRemoveService(id: number) {
  const sql = `DELETE FROM event WHERE event_id = ${id}`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });
}

export function eventEditService(
  title: string,
  start: string,
  end: string,
  id: number
) {
  const sql = `UPDATE event SET event_name = '${title}', event_start_date = '${start}', event_end_date = '${end}' WHERE event_id = ${id}`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  });
}
