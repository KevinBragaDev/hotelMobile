import { Router } from "express";
import {criarLogin} from "../controllers/loginController"
import {cadastrarCliente} from "../controllers/clientesController"

const rotaLogin = Router();

rotaLogin.post("/", criarLogin)
rotaLogin.post("/cadastro", cadastrarCliente)


export default rotaLogin;