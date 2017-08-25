var express = require("express");
var bodyParser = require("body-parser");
var authRoutes = require('./authentication/auth-routes');
var sessions = require('./authentication/sessions');
var songRoute = require('./routes/song-route');
var playlistRoute = require('./routes/playlist-route');
var server = express();
var port = 3000;

var cors = require('cors')
server.use('/', cors({
	origin: 'http://localhost:8080',
	credentials: true
}))
//MIDDLEWARE
// server.use(express.static(__dirname + "/"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(sessions);
server.use('/', authRoutes);
function authenticate(req, res, next) {
	if (req.session.uid) {
		req.body.userId = req.session.uid;
		return next();
	}
	return res.send(401, "please login to continue");
}
server.use('/', authenticate);
server.use('/api/songs', songRoute);
server.use('/api/playlists', playlistRoute);

server.listen(port, () => {
	console.log("starting up Node, on port 3000")
});

var dbConnect = require("./config/db/mlab-config");





