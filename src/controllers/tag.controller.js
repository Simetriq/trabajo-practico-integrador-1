import TagModel from "../models/tag.model.js";

export const postTag = async (req, res) => {
  try {
    const crearUnaTag = await TagModel.create(req.body);
    return res.status(200).json(crearUnaTag);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error al tratar de crear una etiqueta" });
  }
};

export const getTag = async (req, res) => {
  try {
    const findTagById = await TagModel.findByPk(req.params.id);
    if (!findTagById) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
    return res.status(200).json(findTagById);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de obtener la etiqueta" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const traerTodas = await TagModel.findAll();
    return res.status(200).json(traerTodas);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de obtener las etiquetas" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const deleteTagById = await TagModel.destroy({
      where: { id: req.params.id },
    });

    if (deleteTagById) {
      return res
        .status(200)
        .json({ message: "La etiqueta se ha eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al tratar de eliminar la etiqueta" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const [updateTagById] = await TagModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updateTagById) {
      const tagActualizada = await TagModel.findByPk(req.params.id);
      return res.status(200).json(tagActualizada);
    } else {
      return res.status(404).json({
        message: "No se encontró la etiqueta que se quiere actualizar",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error en la petición de actualización de etiqueta" });
  }
};
