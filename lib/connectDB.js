const mongoose = require("mongoose");
require("dotenv");

async function connectDB() {
	const connection = await mongoose.connect(
		"mongodb+srv://Hiti:<Password>@cluster0.uaj2un9.mongodb.net/?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
	console.log(`Connected to MongoDB host: ${connection.connections[0].host}`);
}

module.exports = { connectDB };
