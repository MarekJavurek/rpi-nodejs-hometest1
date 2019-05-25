const express = require("express");
const app = express();
const port = "8080";
const TemperatureHumidityService = require("./src/services/TemperatureHumidity");
const log = require("./src/Logger");

app.get("/info", (req, res) => {
  res.send(`RPI ZERO W app listening on port ${port}!`);
});

app.get("/", async (req, res) => {
  const tempservice = await TemperatureHumidityService();
  log.log("debug", tempservice);
  if (tempservice) {
    res.send(tempservice);
  } else {
    res.send("Failed to read sensor data");
  }
});

app.listen(port, () =>
  console.log(`RPI ZERO W app listening on port ${port}!`)
);
