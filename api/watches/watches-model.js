const db = require("../../data/db-config");

const getAll = async function () {
  const watches = await db("watch_brands");
  return watches;
};

const getById = async function (id) {
  const watch = await db("watch_brands").where("watch_id", id).first();
  return watch;
};
async function create(watch) {
  let newWatch = await db("watch_brands").insert(watch);
  return await getById(newWatch);
}
function deleteById(id) {
  return db("watch_brands").where("watch_id", id).del();
}
module.exports = {
  getAll,
  getById,
  create,
  deleteById,
};
