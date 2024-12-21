import 'dotenv/config'
import express from 'express';

import SqlRepository from './repositories/SqlRepository.js'
import MongoRepository from './repositories/MongoRepository.js';
import Controller from './controllers/Controller.js';



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


const controller = new Controller()
sqlRepository.createConnection()
mongoRepository.createConnection()
controller.addSqlRepository(sqlRepository)
controller.addMongoRepository(mongoRepository)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

controller.setupRoutes()

app.use('/persons', controller.router);


app.listen(process.env.PORT_API, () => {
  console.log(`listening on port ${process.env.PORT_API}`)
})
