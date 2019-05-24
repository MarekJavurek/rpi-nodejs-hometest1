const express = require("express");
const app = express();

const args = process.argv
  .slice(2)
  .map(arg => arg.split("="))
  .reduce((args, [value, key]) => {
    args[value] = key;
    return args;
  }, {});

let port = 8080;
if (args.env === "PROD") {
  port = 80;
} else {
  port = 8080;
}

app.get("/", (req, res) => res.send("Hello World! 5"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
