var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;
var bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, dropDups: true },
	email: { type: String, required: true, unique: true, dropDups: true },
	password: { type: String, required: true }
})

userSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) {
			return next(err);
		} else {
			bcrypt.hash(user.password, salt, function (err, hash) {
				user.password = hash;
				next();
			});
		}
	});
});

userSchema.methods.validatePassword = function (password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, this.password, function (err, isMatch) {
			if (err || !isMatch) {
				return reject(err);
			}
			return resolve(isMatch);
		});
	})
};

var User = mongoose.model("User", userSchema);

module.exports = User;