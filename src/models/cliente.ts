import { RowDataPacket } from "mysql2";

export type Cliente = RowDataPacket & {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  id_cargo: number;
}
