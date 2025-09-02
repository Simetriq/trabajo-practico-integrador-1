import express from "express";
import {
  deleteArticleTag,
  getAllArticleTags,
  getArticleTag,
  postArticleTag,
  updateArticleTag,
} from "../controllers/articleTag.controller.js";

const routesArticleTag = express.Router();

routesArticleTag.post("/user", postArticleTag);
routesArticleTag.get("/user", getAllArticleTags);
routesArticleTag.get("/user/:id", getArticleTag);
routesArticleTag.put("/user/:id", updateArticleTag);
routesArticleTag.delete("/user/:id", deleteArticleTag);

export default routesArticleTag;
