import {Request, Response, NextFunction} from "express"
import reservaRespository from "../repositories/reservaRepository";
import {corrigirDataHora} from "../utils/datahora";
 
export async function criarPedido(req:Request, res:Response, next:NextFunction) {
    const token = req.payload;
    const {pagamento, quartos} = req.body;

    console.log(token.id, pagamento)
    if (!token.id || !pagamento || !quartos ){
        return res.status(401).json({erro: "Dados incompletos!"})
    }
 
    try {
        const dadosPedido = {
            usuario_id : 1,
            cliente_id : token.id,
            pagamento : pagamento
        }
        // criar o Pedido
        const pedidoID = await reservaRespository.fazerPedido(dadosPedido);
        if (!pedidoID){throw new Error("Erro ao criar o Pedido")}
       
        //criar a reserva para cada um dos quartos
        let result = []
        for (let q of quartos){
            q.dataInicio = await corrigirDataHora(q.dataInicio, 14)
            q.dataFim = await corrigirDataHora(q.dataFim, 12)
            console.log('DADOS:', pedidoID, q)
            const reservaID = await reservaRespository.fazerReserva(pedidoID, q)
            if (!reservaID){continue}
            console.log('feito')
            result.push({
                ...q,
                reservaID: reservaID,
            })
        }
        console.log(result)

        res.status(200).json({
            message:"Reserva feita com sucesso",
            pedidoID: pedidoID,
            reservas: result
        })
 
 
    } catch (error) {
        console.log("meu erro:", error)
        return res.status(400).json({erro: "Reserva não efetuada!"})
    }
 
}
