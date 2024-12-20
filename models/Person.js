import Entity from "./Entity.js";
import { IPerson } from "./InterfacePerson.js";

export default class Person extends Entity{
    constructor(personData) {
        super(IPerson, personData)
    }
}