import jwt from "jsonwebtoken";

const JWT_SECRET ="super_senha_secreta";
const DURACTION = 60 * 60 * 24

export function createJWT() {
  const payload = { 
    userId: 123, 
    name: "Kevin",
    cargo: "cliente"
  }
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: DURACTION,
    algorithm: "HS256"
  })
} 
