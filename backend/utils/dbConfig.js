import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
        dbName: "AIChatbot"
    });
    console.log("Mongodb connected successfully");
    return connection
  } catch (error) {
    console.log(`Mongodb connection error: ${error}`);
    
  }
};

export default dbConnect;