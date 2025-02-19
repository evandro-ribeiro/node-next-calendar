import "reflect-metadata";
import express from "express";
import cors from "cors";
import { router } from "./routes/router.js";
import initializerAppSourceData from "./data-source.js";

export const app = express();

app.use(cors());

app.use(express.json());

initializerAppSourceData();

app.use(router);

app.listen(8080, () => console.log("Servidor rodando na porta 8080"));
