import 'dotenv/config'
import express from 'express';

import SqlRepository from './repositories/SqlRepository.js'
import MongoRepository from './repositories/MongoRepository.js';
import { Collection } from 'mongodb';



const app = express();

const sqlRepository = new SqlRepository({
  host:process.env.SQL_HOST,
  user:process.env.SQL_USER,
  password:process.env.SQL_PASSWORD,
  database:process.env.SQL_DBNAME,
  port:process.env.SQL_DBPORT

})

const mongoRepository = new MongoRepository({
  connectionString: process.env.MONGO_CONNECTION,
  database: process.env.MONGO_DBNAME,
  collection:process.env.MONGO_DBCOLLECTION
})

console.log

app.get('/', async (req, res)=> {
  sqlRepository.createConnection()
  console.log(mongoRepository.connectionString)
  mongoRepository.create_connection()
  const person = (await sqlRepository.getPerson({'dni':'2840838509607'}))
  const result = await mongoRepository.createPerson(person)
  res.send(result)
})

app.listen(process.env.PORT_API, () => {
  console.log(`listening on port ${process.env.PORT_API}`)
})
