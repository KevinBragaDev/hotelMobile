import { Request, Response, NextFunction } from "express";
import quartosRepository from "../repositories/quartosRepository";
import { corrigirDataHora } from "../utils/datahora";
 
async function disponiveis(req: Request, res: Response, next: NextFunction) {
    let { dataInicio, dataFim, quantidade } = req.body;
 
    if (!dataInicio || !dataFim || !quantidade) {
        return res.status(400).json({ erro: "Preencha os campos para consulta" });
    }
 
 
    dataInicio = await corrigirDataHora(dataInicio, 14);
    dataFim = await corrigirDataHora(dataFim, 12);
 
 
    const dados = { dataInicio, dataFim, quantidade };
 
    try {
        let quartos = await quartosRepository.disponiveis(dados);
 
        if (!quartos || quartos.length === 0) {
            return res.status(404).json({ erro: "Nenhum quarto disponível encontrado" });
        }
 
        await Promise.all(
            quartos.map(async (q: any) => {
                const fotos = await quartosRepository.buscarFotoPorQuartoId(q.id);
                q.fotos = fotos;
            })
        );
 
        return res.status(200).json(quartos);
 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro interno ao buscar os quartos" });
    }
}
 
export default {
    disponiveis
};