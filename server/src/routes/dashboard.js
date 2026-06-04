import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", verifyToken, async (req, res) => {
  return res.json({
    message: "Dashboard Data",
    user: req.user,
  });
});

export default dashboardRouter;
