import mongoose from "mongoose";
const equipmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photograph: String,
});
const settingSchema = mongoose.Schema({
  focalLength: {
    type: Number,
    required: true,
  },
  exposure: {
    type: Number,
    required: true,
  },
  aperture: {
    type: Number,
    required: true,
  },
  iso: {
    type: Number,
    required: true,
  },
  whiteBalance: {
    type: Number,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  url: {
    type: String,
    required: true,
  },
  equipment: [
    {
      type: equipmentSchema,
      required: true,
    },
  ],
  settings: {
    type: settingSchema,
    required: true,
  },
});

export default mongoose.model("Photo", userSchema);
