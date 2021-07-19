import "../../src/setup.js";
import { clearDatabase, endConnection } from "../utils/database.js";

import supertest from "supertest";
import app from "../../src/app.js";
import connection from "../../src/database.js";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
    await endConnection();
  });

describe("GET /items", () => {
  it("returns status 200", async () => {
    const result = await supertest(app).get("/items");

    expect(result.status).toEqual(200);
  });
});

describe("POST /items", () => {
  it("returns status 201 for valid params", async () => {
    const body = {
      text: "Test example",
    };
    const result = await supertest(app).post("/items").send(body);

    expect(result.status).toEqual(201);
  });

  it("inserts the new item to the database", async () => {
    const body = {
      text: "Test example",
    };

    const beforeInsert = await connection.query("SELECT * FROM items");
    await supertest(app).post("/items").send(body);
    const afterInsert = await connection.query("SELECT * FROM items");

    expect(beforeInsert.rows.length).toEqual(0);
    expect(afterInsert.rows.length).toEqual(1);
  });

  it("returns status 400 for empty text", async () => {
    const result = await supertest(app).post("/items").send({});

    expect(result.status).toEqual(400);
  });
});
