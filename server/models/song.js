var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var songSchema = new mongoose.Schema({
	title: { type: String, required: true },
	albumArt: { type: String, required: true },
	artist: { type: String, required: true },
	album: { type: String, required: true },
	price: { type: Number, required: true },
	preview: { type: String, required: true },
	link: { type: String, required: true },
	userId: [{ type: ObjectId, ref: 'User', required: true }],
	playlists: [{ type: ObjectId, ref: 'Playlist', required: true }] // have default of allSongs or summat
})

var Song = mongoose.model("Song", songSchema);

module.exports = Song;