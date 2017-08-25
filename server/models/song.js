var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var songSchema = new mongoose.Schema({
	title: { type: String, required: true },
	albumArt: { type: String, required: true },
	artist: { type: String, required: true },
	collection: { type: String, required: true },
	price: { type: Number, required: true },
	preview: { type: String, required: true },
	link: { type: String, required: true },
	userId: { type: ObjectId, ref: "User", required: true },
	playlists: { type: Object, default: {} }
})

var Song = mongoose.model("Song", songSchema);

module.exports = Song;