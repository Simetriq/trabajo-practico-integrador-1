import express from "express";
import {
  deleteArticle,
  getAllArticles,
  getArticle,
  postArticle,
  updateArticle,
} from "../controllers/article.controller.js";
import {
  createArticleValidation,
  deleteArticleValidation,
  getArticleByPkValidation,
} from "../middleware/validations/article.validator.js";
import validations from "../middleware/validator.js";

const routesArticle = express.Router();

routesArticle.post("/tag", createArticleValidation, validations, postArticle);
routesArticle.get("/tag", getAllArticles);
routesArticle.get(
  "/tag/:id",
  getArticleByPkValidation,
  validations,
  getArticle
);
routesArticle.put("/tag/:id", updateArticle, validations, updateArticle);
routesArticle.delete(
  "/tag/:id",
  deleteArticleValidation,
  validations,
  deleteArticle
);

export default routesArticle;
