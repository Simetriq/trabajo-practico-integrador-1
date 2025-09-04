import bcrypt from "bcrypt";
//!                ¿Qué es bcrypt?
//? bcrypt es una librería de hashing de contraseñas
//? Convierte contraseñas en texto plano en strings encriptados irreversibles
//? Es el estándar de la industria para seguridad de contraseñas

// 2. Función hashPassword - Crear hash seguro

//!                 ¿Qué hace?
// Toma una contraseña en texto plano (ej: "miPassword123")
// Genera un hash irreversible (ej: "$2b$10$nOUIs5...")
// Nunca podrás obtener la contraseña original desde el hash

export const hashPassword = async (password) => {
  const saltRounds = 10; // ← Nivel de seguridad
  return await bcrypt.hash(password, saltRounds); // ← Generar hash
};

//! ¿Qué es saltRounds?
// Salt: Datos aleatorios que se agregan antes de hashear
// Rounds: Número de iteraciones (10 = 2^10 = 1024 iteraciones)
// A mayor número: Más seguro pero más lento

// 3. Función comparePassword - Verificar contraseña
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// ¿Qué hace?
// Compara una contraseña en texto plano con un hash
// Devuelve true si coinciden, false si no
// No desencripta: Compara matematicamente sin revelar la contraseña
