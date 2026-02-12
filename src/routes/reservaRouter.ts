// src/routes/reservaRouter.ts
import { Router } from "express";
import { criarPedidoEReserva } from "../controllers/reservasController";

const rotaReserva = Router();
rotaReserva.post("/", criarPedidoEReserva);

export default rotaReserva;