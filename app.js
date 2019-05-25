const express = require("express");
const app = express();
const port = "8080";
var sensor = require("node-dht-sensor");

app.get("/", (req, res) => {
  sensor.read(22, 2, function(err, temperature, humidity) {
    if (!err) {
      res.send(
        "temp: " +
          temperature.toFixed(1) +
          "°C, " +
          "humidity: " +
          humidity.toFixed(1) +
          "%"
      );
    } else {
      res.send("Cant read DHT22");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
