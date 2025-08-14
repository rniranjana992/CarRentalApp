import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    }

    // Optional: set this only once (outside if you call connectDB multiple times)
    mongoose.connection.on('error', (err) => {
        console.error("❌ Mongoose connection error:", err);
    });
};

export default connectDB;
