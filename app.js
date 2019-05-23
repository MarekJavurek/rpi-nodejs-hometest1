const express = require('express')
const app = express()
const port = 3000

process.title = "myApp";

app.get('/', (req, res) => res.send('Hello World! 4'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
