import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
  });
}

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/expenses", expenseRoutes);

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}