import { pool } from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

 async function fazerPedido(data:any){
    const sql = `
        INSERT INTO pedidos (usuario_id, cliente_id, pagamento)
        VALUES (?, ?, ?)
    `;
    try {
        const [result] = await pool.query<ResultSetHeader>(sql, [
            data.usuario_id,
            data.cliente_id,
            data.pagamento
            ]);
        return result.insertId;
    } catch (err) {
        console.error("Erro ao criar pedido:", err);
        return null;
    }
}

 async function fazerReserva(idPedido:number, quarto:object) {
    
}

export default {
    fazerPedido, fazerReserva
}