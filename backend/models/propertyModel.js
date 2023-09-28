import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
      min: 1000,
    },
    rentType: {
      type: String,
      enum: ["per-month", "per-year"],
      default: "per-month",
    },
    propertyType: {
      type: String,
      enum: [
        "residential",
        "commercial",
        "industrial",
        "raw land",
        "special use",
      ],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    numberOfBedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    numberOfBathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    length: {
      type: Number,
      required: true,
      min: 2,
    },
    breadth: {
      type: Number,
      required: true,
      min: 2,
    },
    availableDate: {
      type: Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Property = model("Property", propertySchema);
export default Property;
