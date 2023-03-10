const watchModel = require("./watches-model");

const checkWatchId = async (req, res, next) => {
  try {
    let watch = await watchModel.getById(req.params.id);
    if (!watch) {
      res.status(404).json({
        message: "watch not found with this id",
      });
    } else {
      next();
    }
  } catch (error) {}
};

module.exports = {
  checkWatchId,
};
