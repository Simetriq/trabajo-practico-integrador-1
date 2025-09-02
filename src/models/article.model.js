import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ArticleModel = sequelize.define(
  "Article",

  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      defaultValue: "published",
      allowNull: false,
    },
  },
  {
    // timestamps: false,
  }
);

export default ArticleModel;

Article.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

User.hasMany(Article, {
  foreignKey: "user_id",
  as: "articles",
});
