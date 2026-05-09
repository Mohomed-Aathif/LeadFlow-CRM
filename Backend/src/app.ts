import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "LeadFlow CRM API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/dashboard", dashboardRoutes);

export default app;