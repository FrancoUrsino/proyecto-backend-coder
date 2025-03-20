import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.send({results: "success", payload: users});
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
    console.error("Error al obtener usuarios:", error);
  }
});

export default router;