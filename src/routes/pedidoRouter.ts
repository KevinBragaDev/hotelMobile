import { Router } from "express";
import { criarPedido } from "../controllers/pedidoController";

const rotaPedido = Router();

rotaPedido.post("/", criarPedido);

export default rotaPedido;