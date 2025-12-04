import express from "express";
import { Request, Response, NextFunction } from "express";
import rotaTarefa from "./routes/tarefasRouter";
import handlerRouter from "./routes/router";

const app = express();
app.use(express.json());

app.use(handlerRouter)



export default app;
