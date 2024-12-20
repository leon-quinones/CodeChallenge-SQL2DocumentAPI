import { MongoClient } from "mongodb"

export default class MongoRepository {
    constructor(databaseParams) {
        this.databaseParams = databaseParams
        this.connectionString = 'mongodb:// '+`${this.databaseParams['user']}:${this.databaseParams['password']}
            //@${this.databaseParams['host']}:${this.databaseParams['port']}/
            //${this.databaseParams['database']}` 
    }

    create_connection(){
        // this.client = new MongoClient(this.connectionString)
        // this.connection = this.client.collection(this.databaseParams['collection'])
        console.log(this.connectionString)
    }

    close_connection(){
        this.client.off()
    }


    createPerson(person){
        
    }
}

