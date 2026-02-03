import {pool} from "../database/database"

async function validarLogin(email:string) {
    const sql = `SELECT cliente.id, clientes.nome, clientes.email, clientes.senha, cargos.nome AS cargo
    FROM clientes
    JOIN cargos ON cargos.id = ?`
    const [rows] = await pool.query(sql, [email]);
    return rows.length ? rows[0] : null;
}
 
export default {
    validarLogin
}