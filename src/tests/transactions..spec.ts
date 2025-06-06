import request from "supertest";
import app from "../index";
import { prisma } from "../lib/prisma";

let token: string;
let categoryId: string;

describe("Transactions Routes", () => {
  beforeAll(async () => {
    await prisma.transaction.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    await request(app).post("/auth/register").send({
      name: "Test User",
      email: "tranuser@example.com",
      password: "123456",
    });

    const login = await request(app).post("/auth/login").send({
      email: "tranuser@example.com",
      password: "123456",
    });

    token = login.body.token;

    const category = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Category" });

    categoryId = category.body.id;
  });

  it("should create a new transaction", async () => {
    const res = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "May Payment",
        amount: 3500,
        type: "INCOME",
        categoryId,
        date: new Date().toISOString(),
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should list all transactions", async () => {
    const res = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a transaction", async () => {
    const created = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Freelancer",
        amount: 800,
        type: "INCOME",
        categoryId,
        date: new Date().toISOString(),
      });

    const res = await request(app)
      .put(`/transactions/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Freelancer Updated" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Freelancer Updated");
  });

  it("should delete a transaction", async () => {
    const created = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Notebook Purchase",
        amount: 4000,
        type: "EXPENSE",
        categoryId,
        date: new Date().toISOString(),
      });

    const res = await request(app)
      .delete(`/transactions/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
