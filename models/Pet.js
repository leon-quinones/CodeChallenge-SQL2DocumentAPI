import Entity from "./Entity.js";
import { IPet } from "./InterfacePet.js";

export default class Pet extends Entity{
    constructor(petData) {
        super(IPet, petData)
    }
}