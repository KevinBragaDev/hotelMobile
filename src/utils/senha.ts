import bcrypt from "bcrypt";

const SALT = 10

export async function gerarSenha(senha:string) {
    return bcrypt.hash(senha, SALT)
}

export async function validarSenha(senha:string, hash:string) {
    const hash_normal = hash.replace("$2y$", "$2b$")
    return bcrypt.compare(senha, hash_normal);
}