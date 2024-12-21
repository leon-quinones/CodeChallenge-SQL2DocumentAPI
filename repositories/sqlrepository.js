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

    async initializeDataBase(){
        if (this.connection != undefined) {
            try {
                const query = {
                text: `CREATE TABLE persons (
                            id UUID PRIMARY KEY,
                            first_name varchar(100),
                            last_name varchar(100),
                            gender char,
                            dni varchar(20) UNIQUE ,
                            age int
                        );

                        CREATE TABLE cars (
                            id UUID PRIMARY KEY,
                            brand varchar(60),
                            model varchar(60),
                            model_year varchar(4),
                            person_id UUID
                        );

                        ALTER TABLE cars
                        ADD CONSTRAINT fk_person_car FOREIGN KEY(person_id) REFERENCES persons(id)
                        ON DELETE CASCADE;

                        CREATE TABLE pets (
                          id UUID PRIMARY KEY,
                          race varchar(100),
                          name varchar(100),
                          gender char,
                          person_id UUID
                        );

                        ALTER TABLE pets
                        ADD CONSTRAINT fk_person_pet FOREIGN KEY(person_id) REFERENCES persons(id)
                        ON DELETE CASCADE;

                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('1a5cbfcb-5b07-4979-b051-e0ac12516a17', 'Biel', 'Del río', 'b', '9782270639272', 82);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('116e6cea-aaad-4756-9894-65a1a80b898f', 'Alonso', 'Almanza', 'a', '5850641560624', 30);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('d3ad1c6c-a8c0-4c1c-8588-b209e4bd97ab', 'David', 'Pizarro', 'b', '3985387528125', 47);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('df3a0a13-e91e-42c9-a205-dff27c95ba70', 'Ivan', 'Jaime', 'a', '8711242200838', 28);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('e3518f32-8a2a-4771-ab7b-1c8a3c5bd062', 'Cristian', 'Valverde', 'a', '2257755929928', 66);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('9d14cbad-c815-4043-b08d-d73c0bff9843', 'Rocio', 'Miramontes', 'c', '9210799028609', 18);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('328e3560-0961-4ffe-8bcf-499d39488153', 'Saul', 'Carbonell', 'a', '3343204970890', 20);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('9804d57c-fe9f-43e7-a969-4236a6f11388', 'Hugo', 'Urbina', 'b', '7716661641584', 36);
                        INSERT INTO persons ("id", "first_name", "last_name", "gender", "dni", "age") VALUES ('1771e75a-411b-4ee1-a367-89b7d7a9da1a', 'Joel', 'Roig', 'c', '2840838509607', 26);
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('288a82d6-acd8-4ece-9743-44d4fd6d9fb2', 'aspernatur', 'asperiores', '2016', '1771e75a-411b-4ee1-a367-89b7d7a9da1a');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('02e0cddf-f210-440a-b6f9-354d3e91312c', 'voluptatem', 'architecto', '1983', '328e3560-0961-4ffe-8bcf-499d39488153');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('78dfc21e-6bc0-4fe2-ae0a-e6c5239736f2', 'adipisci', 'harum', '1985', 'e3518f32-8a2a-4771-ab7b-1c8a3c5bd062');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('036f7a6a-f33d-464b-9084-eff01ddb39fb', 'quo', 'aut', '1996', 'df3a0a13-e91e-42c9-a205-dff27c95ba70');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('a2053e74-8f82-4c21-ad99-e1e514b350bd', 'similique', 'consequatur', '1973', 'd3ad1c6c-a8c0-4c1c-8588-b209e4bd97ab');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('62a403f3-0b63-4519-858a-33f0144b4701', 'minus', 'iste', '2018', '116e6cea-aaad-4756-9894-65a1a80b898f');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('eae39041-13ea-4e50-bef8-b2adabd6ad5b', 'sunt', 'perspiciatis', '2020', '1a5cbfcb-5b07-4979-b051-e0ac12516a17');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('7712a35e-76ad-45fd-8104-6068bcb153ad', 'sunt', 'perspiciatis', '1991', '1a5cbfcb-5b07-4979-b051-e0ac12516a17');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('69978ad5-34a6-414b-92aa-e6a005b782b8', 'sunt', 'perspiciatis', '2020', '1a5cbfcb-5b07-4979-b051-e0ac12516a17');
                        INSERT INTO cars ("id", "brand", "model", "model_year", "person_id") VALUES ('bd2b4fab-2a8e-4206-87ee-15fdb1bdb2c6', 'sunt', 'perspiciatis', '2023', '1a5cbfcb-5b07-4979-b051-e0ac12516a17');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('9baa5844-1dbd-4094-b12e-189cc97902a6', 'non', 'rem', 'z', '1771e75a-411b-4ee1-a367-89b7d7a9da1a');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('3113b38c-d42d-49a1-a980-4f29f3226c91', 'optio', 'magni', 'x', '1771e75a-411b-4ee1-a367-89b7d7a9da1a');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('fa7dd87d-b32a-45ba-9186-e70b1a068a67', 'sapiente', 'non', 'i', '1771e75a-411b-4ee1-a367-89b7d7a9da1a');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('6e7c758e-6c09-44ae-b95f-7c7eea10e648', 'qui', 'ratione', 'x', 'df3a0a13-e91e-42c9-a205-dff27c95ba70');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('ce5fd4b7-77d4-4035-942a-6bd3050e58d5', 'at', 'in', 's', '1771e75a-411b-4ee1-a367-89b7d7a9da1a');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('899669f2-9214-4d20-b7fe-083fe8bc2b32', 'tenetur', 'molestiae', 't', '9804d57c-fe9f-43e7-a969-4236a6f11388');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('8c5d57f3-2af2-4af5-9e88-2e447277c3d2', 'et', 'velit', 'c', '9d14cbad-c815-4043-b08d-d73c0bff9843');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('6eaa5440-8435-4a36-ac05-557dc8fcff76', 'eum', 'error', 'o', '9d14cbad-c815-4043-b08d-d73c0bff9843');
                        INSERT INTO pets ("id", "race", "name", "gender", "person_id") VALUES ('8fde841c-69ce-42cc-abda-6921290533f0', 'magni', 'laboriosam', 'n', 'd3ad1c6c-a8c0-4c1c-8588-b209e4bd97ab');`,
                values: []
              }
              await this.connection.query(query)     
            } catch(err)  {
                console.log('database already exists')
            }
           
        }        
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












