export default class Entity{
    constructor(entityInterface, entityData){
        this.#init(entityInterface);
        Object.keys(entityInterface).forEach( field =>{
            this[field] = entityInterface[field](entityData[field])
        });
    }

    #init(entityInterface){
        Object.keys(entityInterface).forEach(field => {
            Object.defineProperty(this, field, {
                value: null,  
                writable: true, 
                enumerable: true, 
                configurable: true           
            })
        });        
    }
}