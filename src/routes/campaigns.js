import express from "express";
import Template from "../models/Template.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

async function simulateDelivery(campaignId) {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) return;

  for (let i = 0; i < campaign.recipients.length; i++) {
    const idx = i;
    const delay = 300 + Math.floor(Math.random() * 800) + idx * 200;

    setTimeout(async () => {
      const success = Math.random() < 0.9;
      const status = success ? "delivered" : "failed";

      const key = `recipients.${idx}.status`;
      const last = `recipients.${idx}.lastUpdate`;

      await Campaign.findByIdAndUpdate(
        campaignId,
        {
          $set: {
            [key]: status,
            [last]: new Date(),
          },
          $inc: {
            ...(success ? { "stats.delivered": 1 } : { "stats.failed": 1 }),
            "stats.sent": 1,
            "stats.queued": -1,
          },
        },
        { new: true }
      );
    }, delay);
  }
}

router.post("/send", async (req, res) => {
  try {
    const { template: templateName, recipients, meta } = req.body;
    if (
      !templateName ||
      !Array.isArray(recipients) ||
      recipients.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "template and recipients array required" });
    }

    const tpl = await Template.findOne({ name: templateName });
    if (!tpl) return res.status(404).json({ error: "Template not found" });

    const initialRecipients = recipients.map((r) => ({
      name: r.name || null,
      number: r.number,
      status: "queued",
      lastUpdate: new Date(),
    }));

    const campaign = new Campaign({
      templateName,
      recipients: initialRecipients,
      stats: {
        queued: initialRecipients.length,
        sent: 0,
        delivered: 0,
        failed: 0,
      },
      meta,
    });

    await campaign.save();

    simulateDelivery(campaign._id).catch((e) => console.error("Sim error:", e));

    res.status(201).json({
      message: "Campaign queued",
      campaignId: campaign._id.toString(),
      status: "queued",
      recipients: initialRecipients.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id/report", async (req, res) => {
  try {
    const { id } = req.params;
    const c = await Campaign.findById(id);
    if (!c) return res.status(404).json({ error: "Campaign not found" });

    res.json({
      campaignId: c._id,
      templateName: c.templateName,
      createdAt: c.createdAt,
      stats: c.stats,
      recipients: c.recipients.map((r) => ({
        name: r.name,
        number: r.number,
        status: r.status,
        lastUpdate: r.lastUpdate,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
