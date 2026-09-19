import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const chickenSchema = new Schema(
  {
    tagId: { type: String, required: true, unique: true },
    breed: { type: String, required: true },
    hatchDate: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female'], lowercase: true, required: true },
    weight: { type: Number, required: true },
    healthStatus: { type: String, required: true },
    coopId: { type: String, required: true }
  },
  { timestamps: true }
  // adds createdAt, updatedAt automatically
);

const Chicken = model('Chicken', chickenSchema);

export default Chicken;
