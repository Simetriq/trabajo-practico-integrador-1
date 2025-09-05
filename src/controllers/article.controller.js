import ArticleModel from "../models/article.model.js";
import UserModel from "../models/user.model.js";

export const postArticle = async (req, res) => {
  try {
    const data = req.data;

    const article = await ArticleModel.create({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status,
      user_id: req.user.id,
    });
    const crearUnArticulo = await ArticleModel.create(req.body);
    return res.status(200).json(crearUnArticulo);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error al tratar de crear un artículo" });
  }
};

export const getArticle = async (req, res) => {
  try {
    const findArticleById = await ArticleModel.findByPk(req.params.id);
    return res.status(200).json(findArticleById);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de traer un artículo" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const traerTodo = await ArticleModel.findAll();
    return res.status(200).json(traerTodo);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de traer los artículos" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findByPk(id, {
      include: {
        model: UserModel,
        as: "author",
        attributes: { exclude: ["password"] },
      },
    });
    const deleteArticleById = await ArticleModel.destroy({
      where: { id: req.params.id },
    });
    if (deleteArticleById)
      return res
        .status(200)
        .json({ message: "El artículo se ha eliminado correctamente" });
    else {
      return res
        .status(400)
        .json({ message: "Error al tratar de eliminar un artículo" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de eliminar un artículo" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const [updateArticleById] = await ArticleModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateArticleById) {
      const articleActualizado = await ArticleModel.findByPk(req.params.id);
      return res.status(200).json(articleActualizado);
    } else {
      return res.status(404).json({
        message: `No se encontró el artículo que se quiere actualizar`,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error en la petición de actualización de artículo" });
  }
};
export const getArticleUserLogin = async (req, res) => {
  try {
    const articleUserLogin = await UserModel.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: ArticleModel,
        as: "articles",
      },
    });

    return res.status(200).json(articleUserLogin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getArticleUserLoginById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findOne({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
