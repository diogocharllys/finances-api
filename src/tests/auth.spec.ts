import request from "supertest";
import app from "../index";
import { prisma } from "../lib/prisma";

describe("Auth routes", () => {
  beforeAll(async () => {
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should register a user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user.name).toBe("Test User");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should login and return a token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
