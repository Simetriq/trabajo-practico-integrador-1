import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ArticleTagModel = sequelize.define(
  "ArticleTag",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    // timestamps: false,
  }
);

export default ArticleTagModel;
