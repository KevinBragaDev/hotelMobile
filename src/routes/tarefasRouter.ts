import { Router } from "express";
import tarefasControllers  from "../controllers/tarefasControllers";

const rotaTarefa= Router();

rotaTarefa.get("/", tarefasControllers.getTarefas)

rotaTarefa.get("/:id", tarefasControllers.getTarefa)

rotaTarefa.post("/", tarefasControllers.criarTarefa)

rotaTarefa.put("/:id", tarefasControllers.atualizarTarefa)

rotaTarefa.delete("/:id", tarefasControllers.deletarTarefa)

export default rotaTarefa;

