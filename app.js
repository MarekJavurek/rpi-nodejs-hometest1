const log = require("simple-node-logger").createSimpleLogger("RPI-app.log");

const express = require("express");
const app = express();
const port = "8080";
var sensor = require("node-dht-sensor").promises;
sensor.setMaxTries(10);

/* var winston = require("winston");

var logger = new winston.Logger({
  level: "error",
  transports: [new winston.transports.File({ filename: "error.log" })]
}); */

app.get("/", (req, res) => {
  res.send(`RPI ZERO W app listening on port ${port}!`);
});

app.get("/sync", (req, res) => {
  var readout = sensor.readSync(22, 2);
  res.send("DHT22: " + readout);
});

app.get("/get/:gpioPin", async (req, res) => {
  try {
    const { gpioPin } = req.params;
    const { temperature, humidity } = await sensor.read(22, gpioPin);

    //logger.log("error", "temperature:  %s", temperature);
    //logger.log("error", "humidity:  %s", humidity);

    res.send(
      "temp: " +
        temperature.toFixed(1) +
        "°C, " +
        "humidity: " +
        humidity.toFixed(1) +
        "%"
    );
  } catch (err) {
    res.send("Failed to read sensor data: " + err);
    //logger.log("error", "Failed to read sensor data:  %s", err);
  }
});

app.listen(port, () =>
  console.log(`RPI ZERO W app listening on port ${port}!`)
);
