import { Router } from "express";
import {criarLogin} from "../controllers/loginController"
import {cadastroCliente} from "../controllers/loginController"

const rotaLogin = Router();

rotaLogin.post("/", criarLogin)
rotaLogin.post("/cadastro", cadastroCliente)


export default rotaLogin;