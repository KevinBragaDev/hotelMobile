// controllers/pedidoController.ts
import { Request, Response } from "express";
import pedidoRepository from "../repositories/pedidoRepository";
import { pedido } from "../models/pedido";

export async function criarPedido(req: Request, res: Response) {
  const token = req.payload;
  const { cliente_id, pagamento } = req.body ?? {};

  // Validação dos campos esperados
  if (
    !token?.id ||
    typeof cliente_id !== "number" ||
    typeof pagamento !== "string"
  ) {
    return res.status(400).json({
      erro: "Campos inválidos. Esperado: { cliente_id:number, pagamento:string }",
    });
  }

  const novoPedido: pedido = {
    usuario_id: token.id,
    cliente_id,
    pagamento,
  };

  try {
    const insertId = await pedidoRepository.criarPedido(novoPedido);

    return res.status(201).json({
      mensagem: "Pedido criado com sucesso",
      pedido_id: insertId,
    });
  } catch (err: any) {
    // FK inválida (cliente_id não encontrado)
    if (err?.code === "ER_NO_REFERENCED_ROW_2" || err?.errno === 1452) {
      return res.status(400).json({
        erro: "cliente_id inválido. Nenhum cliente encontrado com esse ID.",
        detalhe: err.sqlMessage,
      });
    }

    console.error("Erro ao criar pedido:", err);
    return res.status(500).json({
      erro: "Erro interno do servidor",
    });
  }
}