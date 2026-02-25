import { pool } from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";



async function fazerPedido(data: any) {
  const sql = `INSERT INTO pedidos (usuario_id, cliente_id, pagamento)
    VALUES (?, ?, ?)`;
  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, [
      data.usuario_id,
      data.cliente_id,
      data.pagamento
    ]);
    return result.insertId;
  } catch (err) {
    console.error("Erro ao fazer pedido:", err);
    return null;
  }
}

async function fazerReserva(idPedido: number, quarto: any) {
  const sql = `INSERT INTO reservas (pedido_id, quarto_id, inicio, fim)
    VALUES (?, ?, ?, ?)`;

  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, [
      idPedido,
      quarto.id,
      quarto.dataInicio,
      quarto.dataFim
    ]);
    return result.insertId;
  } catch (err) {
    console.error("Erro ao fazer reserva:", err);
    return null;
  }
}

export default {
  fazerPedido,
  fazerReserva,
}