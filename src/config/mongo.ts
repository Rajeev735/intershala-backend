import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log(mongoURI)
    if (!mongoURI) {
      throw new Error(
        "MONGO_URI is missing in environment variables"
      );
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(
      "MongoDB Connection Error:",
      error
    );

    process.exit(1);
  }
};

export default connectDB;