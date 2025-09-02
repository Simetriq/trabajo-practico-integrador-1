import { body, param } from "express-validator";

export const createUser = [
  body("username").trim().notEmpty().isLength({ min: 2, max: 50 }).escape(),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email invalido")
    .normalizeEmail()
    .custom(async (email) => {
      try {
        const emailExiste = await User.findOne({ where: { email } });
        if (emailExiste) {
          return Promise.reject("El email pertenece a otro usuario");
        }
      } catch (error) {
        return Promise.reject("Error checking email availability");
      }
    }),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage("La contraseña debe de ser minimo de 1")
    .matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d).$/)
    .withMessage(
      "La contraseña debe tener al menos una minuscula, una mayuscula y un número"
    ),
  role("role")
    .notEmpty()
    .trim()
    .isString()
    .withMessage("Role no es un string")
    .isIn(["user", "admin"])
    .withMessage('El rol debe ser "user" o "admin"'),
];

export const updateUserValidation = [
  body("name").optional().isLength({ min: 2, max: 50 }).trim().escape(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email invalido")
    .normalizeEmail(),
  body("password").optional().isLength({ min: 6 }).matches(/\d/),
  body("role")
    .optional()
    .trim()
    .isString()
    .withMessage("Role no es un string")
    .isIn(["user", "admin"])
    .withMessage('El rol debe ser "user" o "admin"'),
];
export const deleteUserValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage(`ID debe ser un numero entero positivo`)
    .toInt(),
];
export const userByIdValidation = [
  param("id")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage(`ID debe ser un numero entero positivo`)
    .toInt(),
];
