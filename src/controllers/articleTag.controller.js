import ArticleTagModel from "./models/articleTag.model.js";

export const postArticleTag = async (req, res) => {
  try {
    const crearUnArticleTag = await ArticleTagModel.create(req.body);
    return res.status(200).json(crearUnArticleTag);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al tratar de crear una relación artículo-etiqueta",
    });
  }
};

export const getArticleTag = async (req, res) => {
  try {
    const findArticleTagById = await ArticleTagModel.findByPk(req.params.id);
    return res.status(200).json(findArticleTagById);
  } catch (error) {
    return res.status(400).json({
      message: "Error al tratar de traer una relación artículo-etiqueta",
    });
  }
};

export const getAllArticleTags = async (req, res) => {
  try {
    const traerTodo = await ArticleTagModel.findAll();
    return res.status(200).json(traerTodo);
  } catch (error) {
    return res.status(400).json({
      message: "Error al tratar de traer las relaciones artículo-etiqueta",
    });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const deleteArticleTagById = await ArticleTagModel.destroy({
      where: { id: req.params.id },
    });
    if (deleteArticleTagById)
      return res.status(200).json({
        message: "La relación artículo-etiqueta se ha eliminado correctamente",
      });
    else {
      return res.status(400).json({
        message: "Error al tratar de eliminar una relación artículo-etiqueta",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error al tratar de eliminar una relación artículo-etiqueta",
    });
  }
};

export const updateArticleTag = async (req, res) => {
  try {
    const [updateArticleTagById] = await ArticleTagModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateArticleTagById) {
      const articleTagActualizado = await ArticleTagModel.findByPk(
        req.params.id
      );
      return res.status(200).json(articleTagActualizado);
    } else {
      return res.status(404).json({
        message: `No se encontró la relación artículo-etiqueta que se quiere actualizar`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message:
        "Error en la petición de actualización de relación artículo-etiqueta",
    });
  }
};
