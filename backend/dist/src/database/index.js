import { connect } from "mongoose";
export const connectDataBase = async () => {
    try {
        if (!process.env.FindX_MONGODB_URL) {
            throw new Error("MONGO_URI environment variable is not set");
        }
        console.log("🔌 Attempting to connect to MongoDB...");
        await connect(process.env.FindX_MONGODB_URL);
        console.log("✅ Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        throw error;
    }
};
