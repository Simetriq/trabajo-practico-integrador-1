// 1. Configuración inicial, importar dependencias
import dotenv from "dotenv"; //?  dotenv: Carga variables de entorno desde el archivo .env
import jwt from "jsonwebtoken"; //? jwt: Librería para trabajar con JSON Web Tokens
dotenv.config(); //? dotenv.config(): Hace que process.env.JWT_SECRET esté disponible

// 2. Función generateToken - Crear token // llave de axceso

export const generateToken = (payload) => {
  // payload: Datos que quieres incluir en el token (ej: { userId: 1, role: 'user' })
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      // process.env.JWT_SECRET: Clave secreta para firmar el token // Estan en .env
      expiresIn: "1h", // Token // llave válido por 1 hora
    });
  } catch (error) {
    throw new Error("Error generando el token: " + error.message);
  }
};

// 3. Función verifyToken - Verificar token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error verificando el token: " + error.message);
  }
};
// ¿Qué hace?
// Verifica que el token sea válido y esté correctamente firmado
// Verifica que no haya expirado
// Si es válido: Devuelve el payload decodificado
// Si es inválido: Lanza un error
