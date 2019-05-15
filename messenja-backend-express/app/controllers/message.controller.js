"use strict";

var MessageCtrl = function(Message){

	var MessageObj = {};

	MessageObj.PostMessage = function(req, res, next){
		var newMessage = new Message(req.body);
		newMessage.save(function(err, message){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, message: message});
		});
	}

	MessageObj.GetMessage = function(req, res, next){
		Message.find(function(err, messages){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, message: messages});
		});
	}

	MessageObj.UpdateMessage = function(req, res, next){
		Message.findById(req.params.message_id, function(err, message){
			message.save(function(err, message){
				if(err) {
					res.json({status: false, error: "Message not updated"});
				}
				res.json({status: true, message: "Message updated successfully"});
			});
		});
	}

	MessageObj.DeleteMessage = function(req, res, next){
		Message.remove({_id : req.params.message_id }, function(err, messages){
			if(err) {
				res.json({status: false, error: "Delete message unsuccessfull"});
			}
			res.json({status: true, message: "Message deleted successfully"});
		});
	}

	return MessageObj;
}

module.exports = MessageCtrl;
