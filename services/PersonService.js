import Person from "../models/Person.js";
import Car from "../models/Car.js";
import Pet from "../models/Pet.js";
import { IPet } from "../models/InterfacePet.js";
import { IPerson } from "../models/InterfacePerson.js";
import { ICar } from "../models/InterfaceCar.js";


export default class PersonService {
    constructor(repository) {
        this.repository = repository
    }

    async getPerson(personKeyValue){
        const personData = (await this.repository.getUser(personKeyValue))
        console.log('here');
        console.log(personData)
        if (personData == undefined || personData.length == 0) {
            return undefined
        }
        const person = this.#createPerson(personData[0])
        const cars = []
        const pets = []

        personData.forEach(row =>{
            cars.push(this.#createCar(row))
        })

        personData.forEach(row =>{
            pets.push(this.#createPet(row))
        })        

        person.cars = cars
        person.pets = pets
        return person
    }

    #createPet(petData){
        return new Pet(this.#createDto(IPet,'pet_', petData))
    }

    #createCar(carData){
        return new Car(this.#createDto(ICar,'car_', carData))
    }

    #createPerson(personData){
        return new Person(this.#createDto(IPerson,'', personData))
    }

    #createDto(Interface,prefix, data){
        const keysData = Object.keys(data)
        let entityDto = {}
        Interface.forEach(field=>{
            keysData.forEach(key=>{
                if(key.includes(prefix+field))
                {
                    entityDto[field] = data[key]
                }
            })  
        })
        return entityDto
    }
    

}
