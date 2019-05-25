const express = require("express");
const app = express();
const port = "8080";
var sensor = require("node-dht-sensor").promises;
sensor.setMaxTries(3);

app.get("/sync", (req, res) => {
  var readout = sensor.readSync(22, 2);
  res.send("DHT22: " + readout);
});

app.get("/", async (req, res) => {
  try {
    const { temperature, humidity } = await sensor.read(22, 2);
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
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
