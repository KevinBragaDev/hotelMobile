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
handlerRouter.use("/tarefas", rotaTarefa);
handlerRouter.use("/api/login", rotaLogin);
handlerRouter.use("/api/pedidos", rotaPedido);
handlerRouter.use("/api/quartosDisponiveis", rotaQuartos);


handlerRouter.use("/jwt", (req, res)=>{
    const payload = {
        id: 123,
        nome: "fulano",
        cargo: "cliente"
    }
    res.json(createJWT(payload))
})

// rotas privadas
handlerRouter.use("/api/reservas", middleware, rotaReserva);

handlerRouter.get("/testeJWT", middleware, (req, res)=>{
    res.json("passou pelo JWT middleware")
})

export default handlerRouter