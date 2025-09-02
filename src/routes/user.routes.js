import express from "express";
import {
  deleteUser,
  GetAllUsers,
  getUserId,
  postUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createUserValidation,
  deleteUserValidation,
  getUserByPkValidation,
  updateUserValidation,
} from "../middleware/validations/user.validator.js";
import validations from "../middleware/validator.js";

const routesUser = express.Router();

routesUser.post("/user", createUserValidation, validations, postUser);
routesUser.get("/user", GetAllUsers);
routesUser.get("/user/:id", getUserByPkValidation, validations, getUserId);
routesUser.put("/user/:id", updateUserValidation, validations, updateUser);
routesUser.delete("/user/:id", deleteUserValidation, validations, deleteUser);

export default routesUser;
