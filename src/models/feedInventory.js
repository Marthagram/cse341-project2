import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const feedSchema = new Schema(
  {
    feedName: { type: String, required: true }, // Starter Mash, Grower, Layer
    supplier: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    quantityKg: { type: Number, required: true },
    cost: { type: Number, required: true }, // total cost
    expiryDate: { type: Date, required: true },
    location: { type: String, required: true } // Warehouse 1, Warehouse 2
  },
  { timestamps: true }
);

const Feed = model('Feed', feedSchema);

export default Feed;
