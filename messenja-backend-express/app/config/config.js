var config = {
	port: process.env.PORT || 3000,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/messages",
	test_port: 3001,
	test_db: "mongodb://localhost/messages_test"
}
module.exports = config;
