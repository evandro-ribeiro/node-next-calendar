import express from "express";
import * as dotenv from "dotenv";
import {
  eventEditService,
  eventGetAllService,
  eventInsertService,
  eventRemoveService,
} from "../services/EventService.js";
import {
  clientGetClientIdService,
  clientGetService,
  clientInsertService,
} from "../services/ClientService.js";

dotenv.config();
const router = express.Router();

// Rota para cadastro de usuários no sistema
router.post("/user", (req, res) => {
  const body = req.body;
  clientInsertService(body.name, body.email, body.password);
  res.status(201).send("Cliente cadastrado no router com sucesso!");
});

// Rota de login no sistema
router.post("/user/login", async (req, res) => {
  const body = req.body;
  let findUser = await clientGetService(body.email, body.password);
  if (!findUser) res.status(404).send("Usuário não foi encontrado");
  res.status(200).send(findUser);
});

//Rota para pegar id do usuário pelo email
router.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  let resultEmail = await clientGetClientIdService(email);
  res.status(200).send(resultEmail);
});

// Rota para adição de eventos
router.post("/event", (req, res) => {
  const body = req.body;

  if (!body) res.status(400).send("Ocorreu um erro no cadastro do evento.");

  eventInsertService(body.title, body.start, body.end);
  res.status(201).json({ message: "Evento criado com sucesso!" });
  return;
});

// Rota para edição de eventos
router.put("/event/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  eventEditService(body.title, body.start, body.end, id);
  res.status(200).send("Evento alterado com sucesso!");
});

// Rota para remoção de eventos
router.delete("/event/:id", async (req, res) => {
  const id = Number(req.params.id);
  await eventRemoveService(id);
  res.status(200).send("Evento deletado com sucesso!");
});

// Rota para listagem de eventos - pegar por id
router.get("/event/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await eventGetAllService(id);
  res.status(200).json(result);
});

export { router };
