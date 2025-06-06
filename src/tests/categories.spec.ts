import request from "supertest";
import app from "../index";
import { prisma } from "../lib/prisma";

let token: string;

describe("Categories Routes", () => {
  beforeAll(async () => {
    await prisma.transaction.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    await request(app).post("/auth/register").send({
      name: "Test User",
      email: "catuser@example.com",
      password: "123456",
    });

    const login = await request(app).post("/auth/login").send({
      email: "catuser@example.com",
      password: "123456",
    });

    token = login.body.token;
  });

  it("should create a new category", async () => {
    const res = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Food" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should list all categories", async () => {
    const res = await request(app)
      .get("/categories")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a category", async () => {
    const created = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Health" });

    const res = await request(app)
      .put(`/categories/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Health Updated" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Health Updated");
  });

  it("should delete a category", async () => {
    const created = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Transport" });

    const res = await request(app)
      .delete(`/categories/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
