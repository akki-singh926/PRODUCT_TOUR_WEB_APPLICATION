import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  imageUrl: { type: String },
  annotation: { type: String }
});

const tourSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    isPublic: { type: Boolean, default: false },
    steps: [stepSchema],
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
