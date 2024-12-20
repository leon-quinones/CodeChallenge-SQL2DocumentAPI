import 'dotenv/config'
import express from 'express';

import SqlRepository from './repositories/SqlRepository.js'
import MongoRepository from './repositories/MongoRepository.js';



const app = express();

const sqlRepository = new SqlRepository({
  host:process.env.SQL_HOST,
  user:process.env.SQL_USER,
  password:process.env.SQL_PASSWORD,
  database:process.env.SQL_DBNAME,
  port:process.env.SQL_DBPORT
})

const mongoRepository = new MongoRepository({
  host:process.env.MONGO_HOST,
  user:process.env.MONGO_USER,
  password:process.env.MONGO_PASSWORD,
  database:process.env.MONGO_DBNAME,
  port:process.env.MONGO_DBPORT,
  collection:process.env.MONGO_DBCOLLECTION
})


app.get('/', async (req, res)=> {
  sqlRepository.createConnection()
  const person = (await sqlRepository.getPerson({'dni':'2840838509607'}))
  console.log(person)
  res.send(person)
})

app.listen(process.env.PORT_API, () => {
  console.log(`listening on port ${process.env.PORT_API}`)
})
