import mongoose from "mongoose";

/*
 Campaign contains:
  - templateName (string)
  - recipients: [{ name, number, status ('queued'|'sent'|'delivered'|'failed'), lastUpdate }]
  - stats: { queued, sent, delivered, failed }
  - createdAt
  - meta (optional)
*/

const RecipientSchema = new mongoose.Schema({
  name: String,
  number: String,
  status: {
    type: String,
    enum: ["queued", "sent", "delivered", "failed"],
    default: "queued",
  },
  lastUpdate: { type: Date },
});

const CampaignSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  recipients: { type: [RecipientSchema], default: [] },
  stats: {
    queued: { type: Number, default: 0 },
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: () => new Date() },
  meta: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", CampaignSchema);
