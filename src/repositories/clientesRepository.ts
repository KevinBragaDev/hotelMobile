import { cadastrarCliente } from "../controllers/clientesController";
import { pool } from "../database/database";
import { Cliente } from "../models/cliente";



async function cadastrar(dados: Cliente & { nome: string, telefone: string, cpf: string, cargo_id: number }): Promise<Cliente | null> {
    const sql = `INSERT INTO clientes (nome, email, telefone, cpf, senha, id_cargo) VALUES (?, ?, ?, ?, ?, ?)`
    const [rows] = await pool.query<Cliente[]>(sql, [dados.nome, dados.email, dados.telefone, dados.cpf, dados.senha, dados.cargo_id]);
    return rows.length ? rows[0] : null;
}
 
export default {
    cadastrar
}
