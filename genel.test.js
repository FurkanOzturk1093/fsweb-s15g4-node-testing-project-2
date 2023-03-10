const Watches = require("./api/watches/watches-model");

const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("superTest");
test("[1]test environment testing olarak ayarlanmış", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});
describe("[2] getAll", () => {
  test("tüm saatler geliyor mu", async () => {
    const saatler = await Watches.getAll();
    expect(saatler).toBeDefined();
    expect(saatler).toHaveLength(2);
  });
});
describe("[3] getById", () => {
  test("Doğru saat geliyor mu", async () => {
    const res = await Watches.getById(1);
    expect(res).toBeDefined();
    expect(res).toHaveProperty("watch_name", "Rolex");
    expect(res).toHaveProperty("watch_price", 9000);
  });
});
describe("[4] getById", () => {
  test("Olmayan saat hata dönüyor mu", async () => {
    const res = await Watches.getById(3);
    expect(res).not.toBeDefined();
  });
});

describe("[5] create", () => {
  test("Yeni bir saat ekleniyor mu", async () => {
    const newWatch = { watch_name: "casio", watch_price: 500 };
    const res = await superTest(server).post("/api/watches").send(newWatch);
    expect(res).toBeDefined();
    expect(res.body).toHaveProperty("watch_name", "casio");
    expect(res.body).toHaveProperty("watch_price", 500);
    expect(res.body).toHaveProperty("watch_id", 3);
  }, 1000);
});
describe("[6] create", () => {
  test("eksik alan varsa hata veriyor mu", async () => {
    const newWatch = { watch_name: "casio" };
    const res = await superTest(server).post("/api/watches").send(newWatch);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("missing field");
  }, 1000);
});
describe("[7] delete", () => {
  test("id ile seçilen saat seçilen saatin bodysini geri dönüyor mu", async () => {
    const bek = await superTest(server).get("/api/watches/1");
    const res = await superTest(server).delete("/api/watches/1");
    expect(res.body).toStrictEqual(bek.body);
  }, 1000);
});
describe("[8] delete", () => {
  test("id ile seçilen saat siliniyor mu", async () => {
    const res = await superTest(server).delete("/api/watches/1");
    const bek = await superTest(server).get("/api/watches");
    expect(bek.body).not.toHaveProperty("watch_id", 1);
  }, 1000);
});
describe("[9] delete", () => {
  test("id ile seçilen saat yoksa hata veriyor mu", async () => {
    const res = await superTest(server).delete("/api/watches/99");
    expect(res.body.message).toBe("watch not found with this id");
  }, 1000);
});
