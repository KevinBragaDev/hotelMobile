import {pool} from "../database/database"
import { Login, dadosLogin } from "../models/login"
import { ResultSetHeader } from "mysql2";

async function validarLogin(email:string):Promise<Login | null> {
    const sql = `SELECT clientes.id, clientes.nome, clientes.email, clientes.senha, cargos.nome AS cargo
        FROM clientes 
        JOIN cargos ON cargos.id = clientes.id_cargo
        WHERE clientes.email = ?`
    const [rows] = await pool.query<Login[]>(sql, [email]);
    return rows.length ? rows[0] : null;
}

async function cadastroCliente(dadosLogin: dadosLogin):Promise<Login | null> {
    const sql = `INSERT INTO clientes (nome, email, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?)`
    const [result] = await pool.query<ResultSetHeader>(sql, [
        
            dadosLogin.nome, 
            dadosLogin.email, 
            dadosLogin.telefone, 
            dadosLogin.cpf, 
            dadosLogin.senha
        ]);
        if (result.insertId) {
            const resultado: Login = { id:result.insertId, ...dadosLogin, cargo: "cliente" } as Login;
            return resultado;
        }
        return null;
    
    // const [rows] = await pool.query<Login[]>(sql, [dados.nome, dados.email, dados.telefone, dados.cpf, dados.senha]);
    // return rows.length ? rows[0] : null;
}
 
export default {
    validarLogin,
    cadastroCliente
}