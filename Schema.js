const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema({
	index: Number,
	title: String,
	description: String,
	status: Boolean,
	date: Date,
});

const List = mongoose.model("List", ListSchema);

module.exports = { List };
