import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import TagModel from "./tag.model.js";

const ArticleTagModel = sequelize.define(
  "ArticleTag",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  },
  {
    // timestamps: false,
  }
);

export default ArticleTagModel;

ArticleTagModel.belongsToMany(TagModel, {
  through: "ArticletagModel",
  as: "tags",
});

TagModelModel.belongsToMany(ArticleTagModel, {
  through: "ArticleTagModel",
  as: "articles",
});
