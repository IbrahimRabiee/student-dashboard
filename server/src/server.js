import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboard.js";
import taskRouter from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRouter);

app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
