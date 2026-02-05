import { Request, Response, NextFunction } from "express";
import clientesRepository from "../repositories/clientesRepository";

export async function cadastrarCliente(req: Request, res: Response, next: NextFunction){
  const { nome, email, senha } = req.body
  if(!email || !senha || !nome){
    return res.status(401).json({erro:"Nome, email e senha são obrigatorios"})
  }
  if(email.trim() === "" || senha.trim() === "" || nome.trim() === ""){
    return res.status(402).json({erro: "Dados estão vazios"})
  }

  try {
    const existente = await clientesRepository.buscarPorEmail(email);
    if (existente) {
      return res.status(409).json({erro: "Email já cadastrado"});
    }

    const novoCliente = await clientesRepository.cadastrarCliente({ nome, email, senha });
    if (!novoCliente) throw new Error("Falha ao criar cliente");

    const { senha: _senha, ...cliente } = novoCliente;
    return res.status(201).json({sucesso: "Cliente cadastrado com sucesso", cliente});

  } catch (error) {
    console.log(error)
    return res.status(500).json({erro:"Erro ao cadastrar cliente"})
  }
}
