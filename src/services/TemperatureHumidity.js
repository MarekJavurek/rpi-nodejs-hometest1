var sensor = require("node-dht-sensor").promises;

class service {
  getData = async (gpioPin = 2) => {
    try {
      const { temperature, humidity } = await sensor.read(22, gpioPin);

      return {
        temperature: temperature.toFixed(2),
        humidity: humidity.toFixed(2)
      };
    } catch (err) {
      return false;
    }
  };
}

/* 
  var readout = sensor.readSync(22, 2)
  JSON.stringify(readout)
*/

module.exports = service;
