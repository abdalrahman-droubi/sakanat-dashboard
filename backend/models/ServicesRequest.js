const mongoose = require("mongoose");

const servicesRequestSchema = new mongoose.Schema(
  {
    serviceType: {
      name: String,
      price: Number,
    },
    email: { type: String, required: true },
    dateTime: { type: Date, required: true },
    details: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "inprogres", "rejected", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ServicesRequest = mongoose.model(
  "ServicesRequest",
  servicesRequestSchema
);

module.exports.ServicesRequest = ServicesRequest;
