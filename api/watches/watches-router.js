const router = require("express").Router();
const watchModel = require("./watches-model");
const mw = require("./watches-middleware");
router.get("/", (req, res, next) => {
  watchModel
    .getAll()
    .then((watch) => {
      res.json(watch);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", mw.checkWatchId, (req, res, next) => {
  watchModel.getById(req.params.id).then((watch) => {
    res.status(200).json(watch);
  });
});
router.post("/", async (req, res, next) => {
  try {
    let newWatch = await watchModel.create(req.body);
    if (!newWatch.watch_name || !newWatch.watch_price) {
      res.status(400).json({ message: "missing field" });
    } else {
      res.status(201).json(newWatch);
    }
  } catch (error) {}
});
router.delete("/:id", mw.checkWatchId, async (req, res, next) => {
  try {
    let deletedUser = await watchModel.getById(req.params.id);
    if (!deletedUser) {
      next({
        status: 404,
        message: "Olmayan kullanıcıyıcı silemezsiniz",
      });
    } else {
      await watchModel.deleteById(req.params.id);
      res.status(200).json(deletedUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
