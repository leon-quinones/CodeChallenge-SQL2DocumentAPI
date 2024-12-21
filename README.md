# CodeChallenge-SQL2DocumentAPI 🖥️💾➡️📄  
REST API to store data from SQL database into a MongoDB Database 🗃️💻 ✨✨✨

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Project structure](#Project_structure)


## Installation

### Requirements

Make sure you have installed docker engine in your system, if you don't, follow the [official docker installation guide](https://docs.docker.com/engine/install) for your OS.
If you're on windows take a look for the [docker desktop guide](https://docs.docker.com/desktop/) to install docker on your machine.


### How to deploy

1. Create a folder in your file system and named it SQL2DocumentAPI (or whatever name you want 🤣), what we will refer as "app folder"
2. Make sure you have installed docker in your system 
3. Copy the docker-compose.yml file of this repository into your app folder.
4. Create an .env ascii file and paste the following lines in it:
```bash
PORT_API=3000
SQL_HOST=SQLDB
SQL_USER= your username
SQL_PASSWORD= yourpassword
SQL_DBNAME= yourdatabase
SQL_DBPORT= port to expose sql database
MONGO_HOST=MONGODB
MONGO_USER=your mongo user
MONGO_DBPORT=port to expose mongo database
MONGO_PASSWORD=your mongo password
MONGO_DBNAME= your mongo database name
MONGO_DBCOLLECTION= your mongo collection to save data
```
if you are not running locally use replace the following lines for your host domains:
```bash
SQL_HOST: your sql domain
MONGO_HOST: your mongo domain

```
⚡ In order to use mongo db atlas, add a line with your atlas string connection :
```bash
MONGO_CONNECTION: atlas connection string with user and password
```
5. Open a terminal/console, go to your app's folder path and run (for GNU/Linux):
```bash
docker compose up
```

## Usage

⚡ The API expose an uniquie endpoint that only accepts GET requests. 
At the first launching, the SQL database is initialized using dummy data that can be found in initializeDatabase method of the sql repository. With the current .env file you will be exposing the ports of your SQL and MongoDb to connect from your local machine. \

### 1. Migrate user data to mongodb 🔄
The API Endpoint can be found in:
```bash
http://host:API_PORT/persons
```
This considering REST principle of Resource-Based interface, so you are migrating people so 'persons' is a good representation. \
Send a request using HTTP Get method and passing the identification number 'dni/cedula/passport' using the following key value pair structure in your query params:
```python
dni: "identification number value" 
```
Optional modifying the url:
```python
http://host:API_PORT/persons?dni=yourvalue
```
### 2 Responses:

🟩 **Status code: 200** - _Body: information saved in mongodb database_     = Selected person was stored in your mongo database succesfully \
🟧 **Status code: 400** - _Error: person already exists in output database_ = Selected person was previous processed \
🟧 **Status code: 400** - _Error: person not found   _                      = Selected person was not found in your SQL database \




## Project structure
The project is built using MVC architectural pattern and repository classes as model layer.
✨The project is easily extensible to others entities models/schemas just defining the car, person and pet interfaces. The respective classes define their fields based on interfaces that are used to initialize each instances.





