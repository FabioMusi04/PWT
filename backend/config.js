import dotenv from 'dotenv';

dotenv.config();

export default {
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8080',
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/PWT',
};