var Message = require('../models/message.model');
var MessageController = require('../controllers/message.controller')(Message);

module.exports = function(app){

	app.get('/messages', MessageController.GetAll);

	app.get('/messages/message/:id', MessageController.GetMessage);

	app.post('/messages', MessageController.PostMessage);

	app.put('/messages/update/:id', MessageController.UpdateMessage);

	app.delete('/messages/delete/:id', MessageController.DeleteMessage);

}
