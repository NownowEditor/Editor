var log4js = require("log4js");
log4js.configure(__dirname + "/../conf/log4js.json");

exports.server = log4js.getLogger("server");
exports.business = log4js.getLogger("business");
exports.fixture = log4js.getLogger("fixture");