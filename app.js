import 'dotenv/config'
import express from 'express';

import SqlRepository from './repositories/sqlrepository.js'

const app = express();
const port = 3000;
// console.log(await pool.query('SELECT * from persons'))

const sqlRepository = new SqlRepository({
  host:process.env.SQL_HOST,
  user:process.env.SQL_USER,
  password:process.env.SQL_PASSWORD,
  database:process.env.SQL_DBNAME,
  port:process.env.SQL_DBPORT
})


app.get('/', async (req, res)=> {

  sqlRepository.createConnection()
  if (sqlRepository != undefined) {
    console.log(await sqlRepository.getUsers('9782270639272'))
    res.send('Hello World!')
  }
  else {
    res.send('lol World!')
  }

})

app.listen(port, () => {
  console.log(`listening on port ${process.env.PORT_API}`)
})
