const TemperatureHumidityService = require("./src/services/TemperatureHumidity");
const log = require("./src/Logger");

var test = async (gpioPin = 2) => {
  const tempservice = await TemperatureHumidityService();
  log.log("debug", tempservice);
};

test();
