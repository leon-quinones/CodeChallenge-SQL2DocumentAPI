import 'dotenv/config'
import express from 'express';

import SqlRepository from './repositories/SqlRepository.js'
import MongoRepository from './repositories/MongoRepository.js';
import PersonService from './services/PersonService.js';


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
  const personService = new PersonService(sqlRepository)
  // const person =await personService.getPerson({'dni':'9782270639272'})
  const person = (await personService.getPerson({'dni':'9782270639272'}))
  console.log(person)
  res.send(person)
})

app.listen(port, () => {
  console.log(`listening on port ${process.env.PORT_API}`)
})
