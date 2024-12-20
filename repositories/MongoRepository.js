import { MongoClient } from "mongodb"

export default class MongoRepository {
    constructor(databaseParams) {
        
        this.databaseParams = databaseParams
        this.connectionString = this.databaseParams['connectionString']//'mongodb://+srv:'+`${this.databaseParams['user']}:${this.databaseParams['password']}@${this.databaseParams['host']}/${this.databaseParams['database']}` 
    }

    create_connection(){
        this.client = new MongoClient(this.connectionString)
        const database = this.client.db(this.databaseParams['database'])
        this.connection = database.collection(this.databaseParams['collection'])
    }

    close_connection(){
        this.client.off()
    }


    async createPerson(person){
        return this.connection.insertOne(person)
        
    }
}

