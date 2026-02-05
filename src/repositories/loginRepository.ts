import {pool} from "../database/database"
import { Login } from "../models/login"

async function validarLogin(email:string):Promise<Login | null> {
    const sql = `SELECT clientes.id, clientes.nome, clientes.email, clientes.senha, cargos.nome AS cargo
        FROM clientes 
        JOIN cargos ON cargos.id = clientes.id_cargo
        WHERE clientes.email = ?`
    const [rows] = await pool.query<Login[]>(sql, [email]);
    return rows.length ? rows[0] : null;
}
 
export default {
    validarLogin
}