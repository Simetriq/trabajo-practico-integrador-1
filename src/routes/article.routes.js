import express from "express";
import {
  deleteArticle,
  getAllArticles,
  getArticle,
  postArticle,
  updateArticle,
  getArticleUserLogin,
  getArticleUserLoginById,
} from "../controllers/article.controller.js";
import {
  createArticleValidation,
  deleteArticleValidation,
  getArticleByPkValidation,
} from "../middleware/validations/article.validator.js";
import validations from "../middleware/validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { dataValidada } from "../middleware/matched_data.middleware.js";

const routesArticle = express.Router();

routesArticle.post(
  "/article",
  authMiddleware,
  createArticleValidation,
  validations,
  dataValidada,
  postArticle
);

routesArticle.get("/articles", authMiddleware, getAllArticles);

routesArticle.get(
  "/article/:id",
  authMiddleware,
  getArticleByPkValidation,
  validations,
  getArticle
);

routesArticle.get("/article/user", authMiddleware, getArticleUserLogin);

routesArticle.put(
  "/article/:id",
  authMiddleware,
  createArticleValidation,
  validations,
  dataValidada,
  updateArticle
);

routesArticle.delete(
  "/article/:id",
  authMiddleware,
  deleteArticleValidation,
  validations,
  deleteArticle
);

routesArticle.get(
  "/articles/user/:id",
  authMiddleware,
  getArticleUserLoginById
);

export default routesArticle;
