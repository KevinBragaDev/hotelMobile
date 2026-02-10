import { Router } from "express";
import { criarReserva } from "../controllers/reservasController";

const rotaReserva = Router();

rotaReserva.post("/pedidos", criarReserva)
rotaReserva.post("/", criarReserva)

export default rotaReserva;