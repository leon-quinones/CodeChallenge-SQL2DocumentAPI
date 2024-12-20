export default class Entity{
    constructor(entityInterface, entityData){
        this.#init(entityInterface);
        entityInterface.forEach( field =>{
            this[field] = entityData[field]
        });
    }

    #init(entityInterface){
        entityInterface.forEach(field => {
            Object.defineProperty(this, field, {
                value: null,  
                writable: true, 
                enumerable: true, 
                configurable: true           
            })
        });        
    }
}