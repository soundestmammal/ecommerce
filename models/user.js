var mongoose = require('mongoose');
var bcript = require('bcript-nodejs');
var Schema = mongoose.Schema;
// The user scheme attributes / characteristics / fields
var UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true}
	password: String,

	profile: {
		name { type: String, default: ''},
		picture { type String, default: ''}
	},
	address: String,
	history: [{
		date: Date,
		paid: { type: Number, default: 0},
	}]
});

// Hash the password before we even save to db

UserSchema.pre('save', function(next) {
	var user = this;
	if(!user.isModified('password'))return next();
	bcript.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcript.hash(user.password, salt, null, function(err, hash) {
			user.password = hash;
			next();
		});
	});
});

// Comepare the password in the database and the one that user type in.

UserSchema.methods.comparePassword = function(password){
	return bcript.compareSync(password, this.password);
}



