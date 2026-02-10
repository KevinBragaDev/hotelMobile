import { error } from "console";
import {Request, Response, NextFunction} from "express";
import loginRepository from "../repositories/loginRepository";
import { validarSenha, gerarSenha } from "../utils/senha"
import { createJWT } from "../utils/jwt";

export async function criarLogin(req: Request, res: Response, next:NextFunction){
  const {email, senha} = req.body
  if(!email || !senha){
    return res.status(401).json({erro:"Email e senha são obrigatorios"})
  }
  if(email.trim() === "" || senha.trim() === ""){
    return res.status(402).json({erro: "Email e senha estão vazios"})
  }
  
  // consulta no banco de dados
    try {
        const result = await loginRepository.validarLogin(email);

        if (!result) {throw new Error("Login incorreto ")}

        // validar senha do login
        const resultSenha= await validarSenha(senha, result.senha);
        if (!resultSenha) {throw new Error("Senha invalida ")}

        // remover senha do objeto
        const {senha:_senha, ...usuario} = result

        // criar o token do usuario
        const token = createJWT({usuario})
        return res.status(200).json(token);

    } catch (error) {
        console.log(error)
        return res.status(403).json({erro:"Credenciais invalidas!"})
    }
}

export async function cadastroCliente(req: Request, res: Response, next:NextFunction){
  const {nome, email, telefone, cpf, senha} = req.body

  if(!nome || !email || !telefone || !cpf || !senha){
    return res.status(400).json({erro:"Todos os campos são obrigatorios"})
  }

  if(nome.trim() === "" || email.trim() === "" || telefone.trim() === "" || cpf.trim() === "" || senha.trim() === "") {
    return res.status(400).json({erro:"Nenhum campo pode estar vazio"})
  }
  try {
    const senhaHash = await gerarSenha(senha);
    const dadosLogin = {nome, email, telefone, cpf, senha: senhaHash}
    const result = await loginRepository.cadastroCliente(dadosLogin)
    if (!result) {throw new Error("Erro ao cadastrar cliente")}

    // remover senha do objeto
        const {senha:_senha, cpf:_cpf, telefone:_telefone, ...usuario} = result

        // criar o token do usuario
        const token = createJWT(usuario)
        return res.status(200).json(token);

    
  } catch (error) { 
      console.log("Erro " + error)
      return res.status(500).json({erro:"Erro ao cadastrar cliente"})
  }
}
