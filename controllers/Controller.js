
import express from 'express';

export default class Controller {
    constructor() {
        this.sqlRepository = null
        this.mongoRepository = null
        this.router = express.Router()

    }

    addSqlRepository(sqlRepository){
        this.sqlRepository = sqlRepository
    }

    addMongoRepository(mongoRepository){
        this.mongoRepository = mongoRepository
    }
    
    setupRoutes() {
        this.router.get('/', async (req, res) => {
            if (req.query.dni == undefined){
                return res.status(400).send({"error": "Bad Request"})    
            }
            const personFound = (await this.mongoRepository.getPerson({'dni':req.query.dni})) 
            
            if (personFound == null){
                const personCreated = (await this.createPerson(req.query.dni))
                if (personCreated == null) {
                    return res.status(400).send({"error":"person not found"})  
                }
                return res.status(200).send({"person":personCreated})  
                
            }else{
                return res.status(400).send({"error":"person already exists in output database"})    
            }
            
          })
    }
    
    async createPerson(dni){
            
            const result = await this.sqlRepository.getPerson({dni:dni})
            if (result == null) return null
            const person = await this.mongoRepository.createPerson(result)
  
            if (person == null) return null
            return await this.mongoRepository.getPerson({_id:person.insertedId})
        
    }

}








    

