import fs from 'node:fs';
import pg from 'pg'
import { parse as uuidParse } from 'uuid';

import { IPerson } from '../models/InterfacePerson.js';
import { ICar } from '../models/InterfaceCar.js';
import { IPet } from '../models/InterfacePet.js';
import Person from '../models/Person.js';
import Car from '../models/Car.js';
import Pet from '../models/Pet.js';

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
                text: `SELECT p.*, \
                        c.id as car_id, c.brand as car_brand, c.model as car_model_name, c.model_year as car_model_year, \
                        t.id as pet_id, t.name as pet_name, t.gender as pet_gender, t.race as pet_race \
                        FROM persons as p \
                        INNER JOIN cars as c \
                        ON c.person_id=p.id \
                        FULL JOIN pets as t \
                        ON t.person_id=p.id \
                        WHERE p.${key}=$1;`,
                values: [searchKeyValue[key]]
              }            
            return (await this.connection.query(query)).rows
        }
    }

    async getPerson(personKeyValue){
        const personData = (await this.getUser(personKeyValue))
        console.log('here');
        console.log(personData)
        if (personData == undefined || personData.length == 0) {
            return undefined
        }
        const person = this.#createPerson(personData[0])
        person.cars = this.#filteredCreation(personData, this.#createCar)
        person.pets = this.#filteredCreation(personData, this.#createPet)
        return person
    }

    #createPet(petData){
        return new Pet(SqlRepository.createDto(IPet,'pet_', petData))
    }

    #createCar(carData){
        return new Car(SqlRepository.createDto(ICar,'car_', carData))
    }

    #createPerson(personData){
        return new Person(SqlRepository.createDto(IPerson,'', personData))
    }

    static createDto(Interface,prefix, data){
        const keysData = Object.keys(data)
        let entityDto = {}
        Interface.forEach(field=>{
            keysData.forEach(key=>{
                if(key ==prefix+field )
                {
                    entityDto[field] = data[key]
                }
            })  
        })
        return entityDto
    }
    
    #filteredCreation(data, creationFunc){
        const controlId = []
        const entitiesCreated = []
        var entity
        data.forEach(row =>{
            entity = creationFunc(row)
            console.log(controlId, entity.id)
            if (!controlId.includes(entity.id)) {
                entitiesCreated.push(entity)
                controlId.push(entity.id)
            }            
        })
        return entitiesCreated

    }    
}












