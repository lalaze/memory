import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI + (process.env.NODE_ENV === 'production' ? '' : '-test');

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

export let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return { client: cached.conn, bucket: cached.bucket };
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return {
        client: mongoose,
        bucket: new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: 'uploads',
        }),
      };
    });
  }
  try {
    const { client, bucket } = await cached.promise;
    cached.conn = client
    cached.bucket = bucket
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return { client: cached.conn, bucket: cached.bucket };
}

export default dbConnect;
