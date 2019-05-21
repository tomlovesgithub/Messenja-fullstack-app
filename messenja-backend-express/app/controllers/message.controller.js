"use strict";

var MessageCtrl = function(Message){

	var MessageObj = {};

	MessageObj.PostMessage = function(req, res, next){
		var newMessage = new Message(req.body);
		newMessage.save(function(err, message){
			if(err){
				res.status(400).json({ error: `Message not posted ${err}`});
				return;
			}
			res.status(201).json({status: true, message: message});
		});
	}

	MessageObj.GetAll = function(req, res, next){
		Message.find(function(err, messages){
			if(err) {
				res.json({status: false, error: `${err}`});
				return
			}
			res.json({status: true, message: messages});
		});
	}

	MessageObj.GetMessage = function (req, res, next) {
		Message.findById(req.body.id, function (err, message) {
			if (err) {
				res.status(404).json({ error: `${err}`});
				return
			}
			res.json({status: true, message: message});
		})
	};

	MessageObj.UpdateMessage = function (req, res, next) {
		var content = req.body.content;
		Message.findById(req.body.id, function(err, message){
			if(err) {
				res.status(400).json({error: `message not updated ${err}`});
			} else {
				message.save(function(err, message){
					message.content = content;
					res.status(201).json({status: true, message: "message updated successfully"});
				});
			};
		});
	}

	MessageObj.DeleteMessage = function(req, res, next){
		Message.deleteOne({id : req.body.id }, function(err, messages){
			if(err) {
				res.status(400).json({error: `message not deleted ${err}`});
			} else {
			res.json({status: true, message: "Message deleted successfully"});
			}
		});
	}

	return MessageObj;
}

module.exports = MessageCtrl;
