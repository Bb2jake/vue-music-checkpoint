var mongoose = require("mongoose");
var connection = mongoose.connection;

mongoose.connect("mongodb://bb2jake:unlimited@ds064198.mlab.com:64198/sportify", {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
})

connection.on('error', (err) => {
	console.log("mlab Error: ", err)
})

connection.once('open', () => {
	console.log("connected to Mlab baby")
})

