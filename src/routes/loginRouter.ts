import { Router } from "express";
import {criarLogin} from "../controllers/loginController"

const rotaLogin = Router();

rotaLogin.post("/", criarLogin)

export default rotaLogin;