const express = require("express");
const mongoose = require("mongoose");
require("dotenv");
const { connectDB } = require("./lib/connectDB");
const path = require("path");
const { List } = require("./Schema");

const app = express();
app.use(express.json());

connectDB();

let idx = 1;

app.get("/", async (req, res) => {
	const x = await List.find({});
	console.log(x);
	res.sendFile(path.join(__dirname, "index.html"));
});

// Create
app.post("/addTask", async (req, res) => {
	try {
		const { title, description } = req.body;

		const newTask = new List({
			index: idx++,
			title: title,
			description: description,
			status: false,
		});

		await newTask.save();

		res.send("Task added");
	} catch (e) {
		console.log(e);
		res.send("Unable to add the task");
	}
});

// Read
app.get("/getTasks", async (req, res) => {
	try {
		const x = await List.find({});
		if (x.length > 0) {
			res.send(x);
		} else {
			throw new Error("No tasks found");
		}
	} catch (e) {
		res.send(e);
	}
});

// Update
app.post("/updateTask/:index", async (req, res) => {
	try {
		const params = req.params;
		const { title, description, status, index } = req.body;
		if (!title || !description || !status || !index) {
			throw new Error("Invalid parameters");
		}
		const updated = await List.updateOne(
			{ index: params.index },
			{ title: title, description: description, status: status, index: index }
		);

		if (updated) {
			res.send("Updated task");
		}
	} catch (e) {
		res.send(e.message);
	}
});

// Delete
app.get("/deleteTask/:index", async (req, res) => {
	try {
		console.log(req.params);
		const params = req.params;

		const x = await List.deleteOne({ index: params.index });

		if (x.acknowledged && x.deletedCount > 0) {
			res.send("Deleted task");
		} else {
			throw new Error("Nothing to delete");
		}
	} catch (e) {
		res.send(e.message);
	}
});

// Server Start
app.listen(3000, () => {
	console.log("server on port 3000");
});
