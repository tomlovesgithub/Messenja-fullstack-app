var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	content: String,
	date: { type: Date, default: new Date() }
});

MessageSchema.pre('save', function(next, done) {
	if(!this.content){
		next(new Error("Message should not be null"));
	}
  	next();
});

var MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
