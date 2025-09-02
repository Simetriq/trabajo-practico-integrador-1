import express from "express";
import dotenv from "dotenv";
import testDB from "./src/config/db.js";
import routesUser from "./src/routes/user.routes.js";
import routesProfile from "./src/routes/profile.routes.js";
import routesTag from "./src/routes/tag.routes.js";
import routesArticle from "./src/routes/article.routes.js";
import routesArticleTag from "./src/routes/articleTag.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", routesUser);
app.use("/api", routesProfile);
app.use("/api", routesTag);
app.use("/api", routesArticle);
app.use("/api", routesArticleTag);

testDB().then(() => {
  app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
  });
});
