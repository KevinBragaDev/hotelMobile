import { ResultSetHeader } from "mysql2";
import {pool} from "../database/database";
import { Reserva } from "../models/reserva";
 
 
async function criarReserva(reserva: Reserva): Promise<Reserva | null> {
    const sql = `
    INSERT INTO reservas (pedido_id, quarto_id, adicional_id, fim, inicio) 
    VALUES (?, ?, ?, ?, ?)`;
 
    const [result] = await pool.query<ResultSetHeader>(sql, [
        reserva.id,
        reserva.pedido_id, 
        reserva.quarto_id, 
        reserva.adicional_id, 
        reserva.fim, 
        reserva.inicio
    ]);

    if (result.insertId) {
        const novaReserva: Reserva = { ...reserva, id: result.insertId };
        return novaReserva;
    }
    return null;
 
}
 
export default {    
    criarReserva
}