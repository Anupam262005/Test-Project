import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";

dotenv.config({
    path: './.env'
});

const fixDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

        console.log("Dropping 'logs' collection to clear bad indexes...");
        try {
            await mongoose.connection.db.dropCollection("logs");
            console.log("✅ 'logs' collection dropped successfully.");
        } catch (err) {
            if (err.code === 26) {
                console.log("ℹ️ 'logs' collection does not exist (nothing to drop).");
            } else {
                throw err;
            }
        }

        console.log("✅ Database fix complete. You can now restart the server.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Database fix failed:", error);
        process.exit(1);
    }
};

fixDB();
