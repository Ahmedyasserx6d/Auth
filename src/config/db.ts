import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const mongoUri = mongoose.connect(process.env.MONGO_URI || "")
    console.log(`MongoDB Connected successfully`);
  } catch (error: any) {
    console.error(`Failed to connect database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;