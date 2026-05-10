const mongoose = require('mongoose');

const buildMongoUri = () => {
  const rawUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/impactly';
  const dbName = process.env.MONGODB_DB || 'test';

  const hasPath = /mongodb(?:\+srv)?:\/\/[^/]+\//.test(rawUri);
  if (hasPath) {
    return rawUri;
  }

  const separator = rawUri.includes('?') ? '/' : '/';
  const [base, query] = rawUri.split('?');
  const withDb = `${base}${separator}${dbName}`;
  return query ? `${withDb}?${query}` : withDb;
};

const connectDB = async () => {
  try {
    const mongoUri = buildMongoUri();

    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
