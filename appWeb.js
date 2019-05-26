const express = require("express");
const app = express();
const port = "8080";
const TemperatureHumidityService = require("./src/services/TemperatureHumidity");
const log = require("./src/Logger");

app.get("/info", (req, res) => {
  res.send(`RPI ZERO W app listening on port ${port}!`);
});

app.get("/", async (req, res) => {
  try {
    const tempservice = new TemperatureHumidityService();
    const data = await tempservice.getData();

    log.log("debug", data);
    if (data) {
      res.send(JSON.stringify(data));
    } else {
      res.send("Failed to read sensor data");
    }
  } catch (err) {
    log.log("error", err);
  }
});

app.listen(port, () =>
  console.log(`RPI ZERO W app listening on port ${port}!`)
);
