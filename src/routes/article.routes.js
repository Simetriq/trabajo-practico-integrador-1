import express from "express";
import {
  deleteArticle,
  getAllArticles,
  getArticle,
  postArticle,
  updateArticle,
} from "../controllers/article.controller.js";

const routesArticle = express.Router();

routesArticle.post("/tag", postArticle);
routesArticle.get("/tag", getAllArticles);
routesArticle.get("/tag/:id", getArticle);
routesArticle.put("/tag/:id", updateArticle);
routesArticle.delete("/tag/:id", deleteArticle);

export default routesArticle;
