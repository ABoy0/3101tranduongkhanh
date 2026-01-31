import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

export default router;
