const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyImage: {
      type: [String],
      required: true,
    },
    services: {
      type: [String],
      required: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    workHours: {
      type: {
        Monday: {
          start: String,
          end: String,
        },
        Tuesday: {
          start: String,
          end: String,
        },
        Wednesday: {
          start: String,
          end: String,
        },
        Thursday: {
          start: String,
          end: String,
        },
        Friday: {
          start: String,
          end: String,
        },
        Saturday: {
          start: String,
          end: String,
        },
        Sunday: {
          start: String,
          end: String,
        },
      },
      required: true,
    },
    active: { type: Boolean, default: true },
    role: {
      type: String,
      default: "provider",
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Provider = mongoose.model("Provider", ProviderSchema);

module.exports.Provider = Provider;
