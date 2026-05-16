import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/todos", todoRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Postgres connected via TypeORM");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

start();