// 1. IMPORTACIONES
import { verifyToken } from "../helpers/jwt.helper.js"; // Función para verificar JWT
import UserModel from "../models/user.model.js"; // Modelo de Usuario

// 2. DEFINICIÓN DEL MIDDLEWARE
export const authMiddleware = async (req, res, next) => {
  try {
    // 3. EXTRAER EL TOKEN DE LAS COOKIES
    const token = req.cookies.token;

    // 4. VERIFICAR SI EXISTE EL TOKEN
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
      // ⚠️ Si no hay token → Error 401 (No autorizado)
    }

    // 5. VERIFICAR Y DECODIFICAR EL TOKEN
    const decoded = verifyToken(token);
    // ✅ verifyToken() verifica la firma y expiración del JWT
    // ❌ Si el token es inválido o expiró, lanzará un error

    // 6. BUSCAR EL USUARIO EN LA BASE DE DATOS
    const user = await UserModel.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }, // ← Excluir contraseña por seguridad
    });

    // 7. VERIFICAR SI EL USUARIO EXISTE
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
      // ⚠️ Token válido pero usuario no existe → Error 401
    }

    // 8. AGREGAR EL USUARIO AL REQUEST
    req.user = user;
    // ✅ Ahora todos los controladores que usen este middleware tendrán acceso al usuario

    // 9. CONTINUAR CON EL SIGUIENTE MIDDLEWARE O CONTROLADOR
    next();
  } catch (error) {
    // 10. MANEJO DE ERRORES
    return res.status(401).json({ message: "Unauthorized" });
    // ⚠️ Cualquier error (token inválido, expirado, etc.) → Error 401
  }
};
