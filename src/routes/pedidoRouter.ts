import { Router } from "express";
import { criarPedido } from "../controllers/pedidoController";
import { middleware } from "./jwtMiddleware";

const rotaPedido = Router();

rotaPedido.post("/", middleware, criarPedido);

export default rotaPedido;