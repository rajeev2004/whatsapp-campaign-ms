import express from "express";
import Template from "../models/Template.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { name, content } = req.body;
    if (!name || !content)
      return res.status(400).json({ error: "name and content required" });

    const existing = await Template.findOne({ name });
    if (existing) {
      existing.content = content;
      await existing.save();
      return res.json({ message: "Template updated", template: existing });
    }

    const tpl = new Template({ name, content });
    await tpl.save();
    res.status(201).json({ message: "Template created", template: tpl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const all = await Template.find({}).sort({ createdAt: -1 });
    res.json({ templates: all });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
