import express from "express";
import { Request, Response, NextFunction } from "express";
import rotaTarefa from "./routes/tarefasRouter";

const app = express();
app.use(express.json());

app.use("/tarefas", rotaTarefa);



export default app;
