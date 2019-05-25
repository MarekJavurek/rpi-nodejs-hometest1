const log = require("simple-node-logger").createSimpleFileLogger("_appLog.log");
log.setLevel("trace");

module.exports = log;
