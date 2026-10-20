
import mongoose from "mongoose";

// Open a MongoDB connection using the URI configured in the environment.
const connectDb = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI must be set to connect to MongoDB.");
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
}

export default connectDb;