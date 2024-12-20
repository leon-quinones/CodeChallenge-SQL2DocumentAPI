require('dotenv').config()
var express = require('express');
const app = express();
const port = 3000;


var indexRouter = require('./routes/index');

app.get('/', (req, res)=> {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT_API}`)
})
