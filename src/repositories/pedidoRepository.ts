// src/repositories/pedidoRepository.ts
import { pool } from "../database/database";
import { pedido } from "../models/pedido";
import { ResultSetHeader } from "mysql2";

/**
 * Cria um pedido e retorna o ID gerado (insertId).
 * 
 * Observações:
 * - Se `cliente_id` não existir em `clientes(id)`, o MySQL lança erro
 *   ER_NO_REFERENCED_ROW_2 (errno 1452). Trate no controller.
 */
async function criarPedido(novo: pedido): Promise<number> {
  const sql = `
    INSERT INTO pedidos (cliente_id, pagamento)
    VALUES (?, ?)
  `;

  const params = [novo.cliente_id, novo.pagamento];

  const [result] = await pool.query<ResultSetHeader>(sql, params);
  return result.insertId;
}

export default {
  criarPedido,
};