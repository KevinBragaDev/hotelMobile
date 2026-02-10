import { NextFunction, Request, Response } from "express";
import reservaRepository from "../repositories/reservaRepository";
 


export async function criarReserva(req: Request, res: Response, next: NextFunction){
    const {pedido_id, quarto_id, adicional_id, fim, inicio} = req.body;
    if(!pedido_id || !quarto_id || !adicional_id || !fim || !inicio){
        return res.status(400).json({erro: "Todos os campos são obrigatórios"});
    }
    if(pedido_id === "" || quarto_id === "" || adicional_id === "" || fim.trim() === "" || inicio.trim() === ""){
        return res.status(400).json({erro: "Os campos não podem ser vazios"});
    }
 
    try{
        await reservaRepository.criarReserva({id,pedido_id, quarto_id, adicional_id, fim, inicio});
 
        return res.status(200).json({mensagem: "Reserva criada com sucesso"});
    }catch(error){
        console.log(error);
        return res.status(500).json({erro: "Erro ao criar reserva"});
    }
}