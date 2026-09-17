// - Connect to MongoDB once

import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is missing in .env');

    await mongoose.connect(uri, {
      dbName: 'poultryFarmDB'
    });

    console.log('MongoDB Connected ✅');
    console.log('Database:', mongoose.connection.name);
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
};

export default connectDB;
