import { RowDataPacket } from "mysql2";

export type Login = RowDataPacket & {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cargo: string;
}

export type dadosLogin = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
}