import 'dotenv/config'
import express from 'express';

import SqlRepository from './repositories/SqlRepository.js'
import MongoRepository from './repositories/MongoRepository.js';
import Person from './models/person.js';
import {IPerson} from './models/InterfacePerson.js'
import Car from './models/Car.js';


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
  const person = new Car( 
    {
      _id: 'test',
      brand: 'test',
      model: 'test',
      model_year: 'test'
  }    
  );
  res.send(person)
  // sqlRepository.createConnection()
  // mongoRepository.create_connection()
  // if (sqlRepository != undefined) {
  //   console.log(await sqlRepository.getUsers('9782270639272'))
  //   res.send('Hello World!')
  // }
  // else {
  //   res.send('lol World!')
  // }

})

app.listen(process.env.PORT_API, () => {
  console.log(`listening on port ${process.env.PORT_API}`)
})
