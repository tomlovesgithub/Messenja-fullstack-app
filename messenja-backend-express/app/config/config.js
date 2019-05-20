var config = {
	port: process.env.PORT || 3001,
	db: process.env.MONGOLAB_URI || "mongodb://localhost/messages",
	test_port: 1001,
	test_db: "mongodb://localhost/messages_test"
}
module.exports = config;
