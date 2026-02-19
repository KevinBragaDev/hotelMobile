import { pool } from "../database/database";
import { RowDataPacket } from "mysql2";
import { quartoReserva, Quartos } from "../models/quarto";

 async function disponiveis(dados: quartoReserva): Promise<Quartos[]|null> {
    const sql = `
        SELECT *
        FROM quartos q
        WHERE q.qnt_cama_casal * 2 + q.qnt_cama_solteiro >= ?
          AND q.id NOT IN (
              SELECT r.quarto_id
              FROM reservas r
              WHERE (r.fim >= ? AND r.inicio <= ?))`;
    const [quartos] = await pool.query<Quartos[]>(sql, [
        dados.quantidade,
        dados.dataInicio,
        dados.dataFim,
    ]);
    return quartos.length ? quartos : null
}

 async function buscarFotoPorQuartoId(id: number) {
    const sql = ` SELECT F.nome
    FROM imagens_quartos QF
    JOIN imagens F ON QF.imagem_id = F.id
    WHERE QF.quarto_id = ?`;
    const [fotos] = await pool.query<RowDataPacket[]>(sql, [id]);
    return fotos.length ? fotos : null;
}

export default {
    disponiveis,
    buscarFotoPorQuartoId
}