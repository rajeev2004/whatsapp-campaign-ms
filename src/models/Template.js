import mongoose from "mongoose";
const RecipientPlaceholderSchema = new mongoose.Schema({}, { strict: false });
const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // e.g. "Hi {{name}}, your order {{orderId}} is shipped"
  createdAt: { type: Date, default: () => new Date() }
});

export default mongoose.models.Template || mongoose.model("Template", TemplateSchema);
