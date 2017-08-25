let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);

let store = new MongoDBStore({
	uri: 'mongodb://bb2jake:unlimited@ds064198.mlab.com:64198/sportify',
	collection: 'Sessions'
});

store.on('error', error => {
	console.error('SESSION ERROR:', error);
});

module.exports = session({
	secret: "It's dangerous to go alone",
	cookie: {
		maxAge: 1000 * 60 * 15* 60 * 24 * 7 * 4 // 1 month-ish
	},
	store: store,
	resave: true,
	saveUninitialized: true
});