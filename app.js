const express = require("express");
const app = express();
const port = "8080";

const sensor = require("node-dht-sensor").promises;
sensor.setMaxTries(10);

var winston = require("winston");

var logger = new winston.Logger({
  level: "error",
  transports: [new winston.transports.File({ filename: "error.log" })]
});

app.get("/sync", (req, res) => {
  var readout = sensor.readSync(22, 2);
  res.send("DHT22: " + readout);
});

app.get("/", async (req, res) => {
  try {
    const { temperature, humidity } = await sensor.read(22, 2);

    logger.log("error", "temperature:  %s", temperature);
    logger.log("error", "humidity:  %s", humidity);

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
    logger.log("error", "Failed to read sensor data:  %s", err);
  }
});

app.listen(port, () =>
  console.log(`RPI ZERO W app listening on port ${port}!`)
);
