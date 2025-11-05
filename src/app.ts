import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
// Rota generica
app.use((req: Request, res: Response, next: NextFunction) => {
res.send("hello world");
});
// rota de erro
app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
res.status(500).send("Erro na requisição" );
});

export default app;
