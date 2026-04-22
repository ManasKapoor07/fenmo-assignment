import request from "supertest";
import app from "../server.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import Expense from "../models/Expense.js";

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Expense.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});



describe("POST /expenses - Idempotency", () => {
  it("should not create duplicate expense for same idempotencyKey", async () => {
    const payload = {
      amount: 50000,
      category: "Food",
      description: "Lunch",
      date: "2026-04-22",
      idempotencyKey: "test-unique-123",
    };

    const res1 = await request(app)
      .post("/api/expenses")
      .send(payload);

    const res2 = await request(app)
      .post("/api/expenses")
      .send(payload);

    expect(res1.statusCode).toBe(201);
    expect(res2.statusCode).toBe(200); 

    expect(res1.body.id).toBe(res2.body.id);
  });
});



describe("GET /expenses - filter & sort", () => {
  it("should filter by category and sort by date desc", async () => {
    // Create test data
    await request(app).post("/api/expenses").send({
      amount: 10000,
      category: "Food",
      description: "A",
      date: "2026-04-20",
      idempotencyKey: "f1",
    });

    await request(app).post("/api/expenses").send({
      amount: 20000,
      category: "Travel",
      description: "B",
      date: "2026-04-22",
      idempotencyKey: "f2",
    });

    await request(app).post("/api/expenses").send({
      amount: 15000,
      category: "Food",
      description: "C",
      date: "2026-04-21",
      idempotencyKey: "f3",
    });

    const res = await request(app).get(
      "/api/expenses?category=Food&sort=desc"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);

    const firstDate = new Date(res.body[0].date);
    const secondDate = new Date(res.body[1].date);

    expect(firstDate >= secondDate).toBe(true);
  });
});