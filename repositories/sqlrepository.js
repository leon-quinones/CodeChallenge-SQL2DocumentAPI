import fs from 'node:fs';
import pg from 'pg'
import { parse as uuidParse } from 'uuid';

const { Pool } = pg

export default class SqlRepository {
    constructor(connectionParams) {
        this.connectionParams = connectionParams
    }

    createConnection (connectionParams) {
        try {
            this.connection = new Pool({
            user:  process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            host: process.env.SQL_HOST,
            port: process.env.SQL_DPORT,
            database: process.env.SQL_DBNAME,
          })
          
        } catch(err) {
            console.log(err)
            this.connection = undefined
        }
    }

    async getUsers (userDni) {
        if (this.connection != undefined) {
            const query = {
                text: 'SELECT p.*, \
                       c.id as car_id, c.brand as car_brand, c.model as car_model, c.model_year as car_year, \
                       t.id as pet_id, t.name as pet_name, t.gender as pet_gender, t.race as pet_race \
                       FROM persons as p \
                       INNER JOIN cars as c \
                       ON c.person_id=p.id \
                       FULL JOIN pets as t \
                       ON t.person_id=p.id \
                       WHERE p.dni=$1;',
                values: [ userDni],
              }            
            return (await this.connection.query(query)).rows
        }
    }
}










