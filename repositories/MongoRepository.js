import { MongoClient } from "mongodb"

export default class MongoRepository {
    constructor(databaseParams) {
        
        this.databaseParams = databaseParams
        this.connectionString = this.databaseParams['connectionString']//'mongodb://+srv:'+`${this.databaseParams['user']}:${this.databaseParams['password']}@${this.databaseParams['host']}/${this.databaseParams['database']}` 
    }

    createConnection(){
        this.client = new MongoClient(this.connectionString)
        const database = this.client.db(this.databaseParams['database'])
        this.connection = database.collection(this.databaseParams['collection'])
    }

    closeConnection(){
        this.client.off()
    }


    async createPerson(person){

        return await this.connection.insertOne(person)
        
    }

    async getPerson(keySearch){
 
        return await this.connection.findOne(keySearch)
    }
}

