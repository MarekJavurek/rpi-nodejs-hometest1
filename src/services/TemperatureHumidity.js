var sensor = require("node-dht-sensor").promises;

var service = async (gpioPin = 2) => {
  try {
    const { temperature, humidity } = await sensor.read(22, gpioPin);

    return (
      "temp: " +
      temperature.toFixed(2) +
      "°C, " +
      "humidity: " +
      humidity.toFixed(2) +
      "%"
    );
  } catch (err) {
    return false;
  }
};

/* app.get("/readSync/:gpioPin", (req, res) => {
  const { gpioPin } = req.params;
  var readout = sensor.readSync(22, gpioPin);
  res.send("Sensor DHT22: " + JSON.stringify(readout));
}); */

module.exports = service;
