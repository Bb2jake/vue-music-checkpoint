var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var myTuneSchema = new mongoose.Schema({
	userId: { type: ObjectId, ref: "User", required: true },
	name: { type: String, required: true }
})

var MyTune = mongoose.model("MyTune", myTuneSchema);

module.exports = MyTune;