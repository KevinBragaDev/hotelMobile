import { Router } from "express";
import { criarPedido } from "../controllers/reservasController";

const rotaReserva = Router();

rotaReserva.post("/", criarPedido);

export default rotaReserva;