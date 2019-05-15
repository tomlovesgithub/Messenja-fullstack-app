var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	message: String,
	date: { type: Date, default: Date.now }
});

MessageSchema.pre('save', function(next, done) {
	if(!this.message){
		next(new Error("Message should not be null"));
	}
  	next();
});

var MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
