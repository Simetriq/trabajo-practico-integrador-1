export const adminMiddleware = async (req, res, next) => {
  try {
    // 1. VERIFICAR SI EL USUARIO ES ADMIN
    if (req.user.role !== "admin")
      // 2. SI NO ES ADMIN → ERROR 403 (Prohibido)
      return res.status(403).json({
        message: "No tiene los permisos necesarios para realizar esta accion",
      });

    // 3. SI ES ADMIN → PERMITIR ACCESO
    next(); //next es una función que le dice a Express: ya terminé mi trabajo, pasa al siguiente middleware o controlador en la cadena.
  } catch (error) {
    // 4. MANEJO DE ERRORES INESPERADOS
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
