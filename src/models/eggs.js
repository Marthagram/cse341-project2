import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const eggSchema = new Schema(
  {
    chickenId: { type: String, required: true }, // links to chickens.tagId
    layDate: { type: Date, required: true },
    weight: { type: Number, required: true }, // in grams
    grade: { type: String, enum: ['A', 'B', 'C'], required: true },
    quality: { type: String, required: true }, // Clean, Cracked, Dirty
    sold: { type: Boolean, default: false, required: true },
    price: { type: Number, required: true } // price per egg
  },
  { timestamps: true }
);

const Egg = model('Egg', eggSchema);

export default Egg;
