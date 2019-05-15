var Message = require('../models/message.model');
var MessageController = require('../controllers/message.controller')(Message);

module.exports = function(app){

	app.get('/messages', MessageController.GetMessage);

	app.post('/messages', MessageController.PostMessage);

	app.put('/messages/:message_id', MessageController.UpdateMessage);

	app.delete('/messages/:message_id', MessageController.DeleteMessage);

}
