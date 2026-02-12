// src/controllers/reservasController.ts
import { Request, Response } from "express";
import reservaRepository from "../repositories/reservaRepository";

/**
 * Controller para criar Pedido + Reserva em uma única operação transacional.
 * Campos esperados no body:
 * {
 *   cliente_id: number,
 *   pagamento: string,
 *   quarto_id: number,
 *   adicional_id: number,
 *   inicio: string (YYYY-MM-DD ou DATETIME),
 *   fim: string (YYYY-MM-DD ou DATETIME)
 * }
 */
export async function criarPedidoEReserva(req: Request, res: Response) {
  const b = req.body ?? {};

  // --- Normalização / coerção de tipos ---
  const cliente_id =
    typeof b.cliente_id === "string" ? Number(b.cliente_id) : b.cliente_id;

  const pagamento =
    typeof b.pagamento === "string" ? b.pagamento.trim() : b.pagamento;

  const quarto_id =
    typeof b.quarto_id === "string" ? Number(b.quarto_id) : b.quarto_id;

  const adicional_id =
    typeof b.adicional_id === "string" ? Number(b.adicional_id) : b.adicional_id;

  const inicio: string = b.inicio;
  const fim: string = b.fim;

  // --- Validação de tipos e presença ---
  if (
    !Number.isFinite(cliente_id) ||
    typeof pagamento !== "string" ||
    pagamento.length === 0 ||
    !Number.isFinite(quarto_id) ||
    !Number.isFinite(adicional_id) ||
    typeof inicio !== "string" ||
    typeof fim !== "string"
  ) {
    return res.status(400).json({
      erro:
        "Campos inválidos. Esperado: { cliente_id:number, pagamento:string, quarto_id:number, adicional_id:number, inicio:string, fim:string }",
      recebido: b,
    });
  }

  // --- Validação de datas ---
  const dInicio = new Date(inicio);
  const dFim = new Date(fim);

  if (isNaN(dInicio.getTime()) || isNaN(dFim.getTime())) {
    return res
      .status(400)
      .json({ erro: "Formato de data inválido para 'inicio' ou 'fim'." });
  }

  if (dInicio >= dFim) {
    return res
      .status(400)
      .json({ erro: "A data de início deve ser anterior à data de fim." });
  }

  // --- Execução transacional (pedido + reserva) ---
  try {
    const result = await reservaRepository.criarPedidoEReserva({
      cliente_id,
      pagamento,
      quarto_id,
      adicional_id,
      inicio,
      fim,
    });

    return res.status(201).json({
      mensagem: "Pedido e reserva criados com sucesso",
      pedido_id: result.pedido_id,
      reserva_id: result.reserva_id,
    });
  } catch (err: any) {
    // Conflito de disponibilidade do quarto
    if (err?.code === "QUARTO_INDISPONIVEL" || err?.status === 409) {
      return res
        .status(409)
        .json({ erro: "Quarto indisponível no período solicitado." });
    }

    // FKs inválidas (cliente/quarto/adicional)
    if (err?.code === "ER_NO_REFERENCED_ROW_2" || err?.errno === 1452) {
      return res.status(400).json({
        erro:
          "Chaves estrangeiras inválidas. Verifique 'cliente_id', 'quarto_id' e 'adicional_id'.",
        detalhe: err?.sqlMessage,
      });
    }

    // Duplicidade / unique key (se houver constraint)
    if (err?.code === "ER_DUP_ENTRY" || err?.errno === 1062) {
      return res.status(409).json({
        erro: "Conflito de dados (registro duplicado).",
        detalhe: err?.sqlMessage,
      });
    }

    console.error("Erro ao criar pedido + reserva:", err);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
}