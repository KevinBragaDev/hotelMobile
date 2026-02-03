import { error } from "console";
import {Request, Response, NextFunction} from "express";
import loginRepository from "../repositories/loginRepository";
 
export async function criarLogin(req: Request, res: Response, next:NextFunction){
  const {email, senha} = req.body
  if(!email || !senha){
    return res.status(401).json({erro:"Email e senha são obrigatorios"})
  }
  if(email.trim() === "" || senha.trim() === ""){
    return res.status(402).json({erro: "Email e senha estão vazios"})
  }

    try {
        const result = await loginRepository.validarLogin(email);
        if (!result) {throw new Error()}

        console.log(result.email)
        console.log(result.senha)
        return res.sendStatus(200);

    } catch (error) {
        console.log(error)
        return res.status(403).json({erro:"Credenciais invalidas!"})
    }
    
}
