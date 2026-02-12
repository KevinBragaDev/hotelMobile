import { Router } from "express";

import quartosController from "../controllers/quartosController";

const rotaQuartos = Router();
rotaQuartos.post("/", quartosController.disponiveis);

export default rotaQuartos;