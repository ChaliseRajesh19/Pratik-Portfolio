import mongoose from 'mongoose';
import createAdmin from '../config/createAdmin.js';

const globalCache = globalThis;

if (!globalCache.__mongooseCache) {
  globalCache.__mongooseCache = {
    conn: null,
    promise: null,
    adminReady: false,
  };
}

const cache = globalCache.__mongooseCache;

export async function connectToDatabase() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;

  if (!cache.adminReady) {
    await createAdmin();
    cache.adminReady = true;
  }

  return cache.conn;
}
