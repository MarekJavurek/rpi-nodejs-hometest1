const TemperatureHumidityService = require("./src/services/TemperatureHumidity");
const log = require("./src/Logger");

var test = async (gpioPin = 2) => {
  const tempservice = new TemperatureHumidityService();
  log.log("debug", tempservice);
  const temp = await tempservice.getData(gpioPin);
  log.log("debug", temp);
};

test();
