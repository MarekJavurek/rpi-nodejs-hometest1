const express = require("express");
const app = express();
const port = "8080";
const TemperatureHumidityService = require("./src/services/TemperatureHumidity");

app.get("/", (req, res) => {
  res.send(`RPI ZERO W app listening on port ${port}!`);
});

app.get("/readAsync/:gpioPin*?", async (req, res) => {
  const tempservice = await TemperatureHumidityService();
  if (tempservice) {
    res.send(tempservice);
  } else {
    res.send("Failed to read sensor data");
  }
});

app.listen(port, () =>
  console.log(`RPI ZERO W app listening on port ${port}!`)
);
