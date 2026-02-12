// src/repositories/reservaRepository.ts
import { pool } from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Reserva, pedido } from "../models/reserva";

export async function criarPedidoEReserva(dados: {
    cliente_id: number;
    pagamento: string;
    quarto_id: number;
    adicional_id: number;
    inicio: string;
    fim: string;
}): Promise<{ pedido_id: number; reserva_id: number }> {

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // 1️⃣ Criar pedido
        const sqlPedido = `
            INSERT INTO pedidos (cliente_id, pagamento)
            VALUES (?, ?)
        `;
        const [pedidoResult] = await conn.query<ResultSetHeader>(sqlPedido, [
            dados.cliente_id,
            dados.pagamento
        ]);

        const pedidoId = pedidoResult.insertId;

        // 2️⃣ Checar disponibilidade do quarto
        const sqlCheck = `
            SELECT id
            FROM reservas
            WHERE quarto_id = ?
              AND NOT (? >= fim OR ? <= inicio)
            FOR UPDATE
        `;
        const [conflitos] = await conn.query<RowDataPacket[]>(sqlCheck, [
            dados.quarto_id,
            dados.inicio,
            dados.fim
        ]);

        if (conflitos.length > 0) {
            const erro: any = new Error("Quarto indisponível no período solicitado");
            erro.code = "QUARTO_INDISPONIVEL";
            erro.status = 409;
            throw erro;
        }

        // 3️⃣ Criar reserva vinculada ao pedido
        const sqlReserva = `
            INSERT INTO reservas (pedido_id, quarto_id, adicional_id, inicio, fim)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [reservaResult] = await conn.query<ResultSetHeader>(sqlReserva, [
            pedidoId,
            dados.quarto_id,
            dados.adicional_id,
            dados.inicio,
            dados.fim
        ]);

        await conn.commit();

        return {
            pedido_id: pedidoId,
            reserva_id: reservaResult.insertId
        };

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    criarPedidoEReserva
};