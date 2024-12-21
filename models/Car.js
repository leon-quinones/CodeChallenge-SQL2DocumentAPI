import Entity from "./Entity.js";
import { ICar } from "./InterfaceCar.js";

export default class Car extends Entity{
    constructor(carData) {
        super(ICar, carData)
    }
}