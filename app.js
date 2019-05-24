const express = require("express");
const app = express();

const args = process.argv
  .slice(2)
  .map(arg => arg.split("="))
  .reduce((args, [value, key]) => {
    args[value] = key;
    return args;
  }, {});

const port = args.port;

app.get("/", (req, res) => res.send("Hello World! 5"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
