import { Router } from "express";
import rotaLogin from "./loginRouter";

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


export default handlerRouter