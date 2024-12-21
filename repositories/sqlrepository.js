import pg from 'pg'
import { stringify, stringify as uuidStringify } from 'uuid';
import { IPerson } from '../models/InterfacePerson.js';
import { ICar } from '../models/InterfaceCar.js';
import { IPet } from '../models/InterfacePet.js';
import Person from '../models/Person.js';
import Car from '../models/Car.js';
import Pet from '../models/Pet.js';
import { UUID } from 'mongodb';

const { Pool } = pg

export default class SqlRepository {
    constructor(connectionParams) {
        this.connectionParams = connectionParams
    }

    createConnection () {
        try {
            this.connection = new Pool({
            user:  this.connectionParams['user'],
            password: this.connectionParams['password'],
            host: this.connectionParams['host'],
            port: this.connectionParams['port'],
            database: this.connectionParams['database'],
          })
          
        } catch(err) {
            console.log(err)
            this.connection = undefined
        }
    }

    async closeConnection(){
        await this.connection.end()
    }

    async getUser(searchKeyValue) {
        if (this.connection != undefined) {
            const key = Object.keys(searchKeyValue)[0]
            const query = {
                text: `SELECT p.*, \
                        c.id as car_id, c.brand as car_brand, c.model as car_model_name, c.model_year as car_model_year, \
                        t.id as pet_id, t.name as pet_name, t.gender as pet_gender, t.race as pet_race \
                        FROM persons as p \
                        LEFT JOIN cars as c \
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
        if (personData == undefined || personData.length == 0) {
            return null
        }
        const person = this.#createPerson(personData[0])
        person.cars = this.#filteredCreation(personData, this.#createCar)
        person.pets = this.#filteredCreation(personData, this.#createPet)
        return person
    }

    #createPet(petData){
        const dto = SqlRepository.createDto(IPet,'pet_', petData)
        if (Object.keys(dto).length==0)
            return null
        return new Pet(dto)
    }

    #createCar(carData){
        const dto = SqlRepository.createDto(ICar,'car_', carData)
        if (Object.keys(dto).length==0)
            return null
        return new Car(dto)
    }

    #createPerson(personData){
        const dto = SqlRepository.createDto(IPerson,'', personData)
        if (Object.keys(dto).length==0)
            return null
        return new Person(dto)
    }

    static createDto(Interface,prefix, data){
        
        const keysData = Object.keys(data)
        let entityDto = {}
        Object.keys(Interface).forEach(field=>{
            keysData.forEach(key=>{
                if(key==prefix+field )
                {
                    if ( data[key]==null){
                        return 
                    } else {
                        entityDto[field] = data[key]
                    }                        
                }
            })  
        })
        return entityDto
    }

    
    #filteredCreation(data, creationFunc){
        const controlId = []
        const entitiesCreated = []
        let entity
        data.forEach(row =>{
            entity = creationFunc(row)
            if (entity!=null){
                const id = stringify(entity.id)
                if (!controlId.includes(id)) {                

                    entity.id = UUID.createFromHexString(id)
                    entitiesCreated.push(entity)
                    controlId.push(id)
                }            
            }            
        })
        return entitiesCreated
    }    

}












