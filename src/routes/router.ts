import { Router } from "express";
import rotaTarefa from "./tarefasRouter";
import rotaLogin from "./loginRouter";

import { createJWT } from "../utils/jwt";
import { middleware } from "./jwtMiddleware";
import rotaPedido from "./pedidoRouter";
import rotaQuartos from "./quartosRouter";
import rotaReserva from "./reservaRouter";

const handlerRouter = Router();


// rotas publicas

handlerRouter.use("/api/login", rotaLogin);
handlerRouter.use("/api/quartosDisponiveis", rotaQuartos);


// rotas privadas
handlerRouter.use("/api/reservas", middleware, rotaReserva);

handlerRouter.get("/testeJWT", middleware, (req, res)=>{
    res.json("passou pelo JWT middleware")
})

export default handlerRouter