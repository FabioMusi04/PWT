
import mongoose from 'mongoose';
import environment from '../../../config.js';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${environment.MONGO_URI}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export default {
  connectToMongoDB,
};