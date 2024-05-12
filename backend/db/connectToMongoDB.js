import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectToMongoDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://user:1234@cluster0.oe2xykv.mongodb.net/chatappnew");
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
