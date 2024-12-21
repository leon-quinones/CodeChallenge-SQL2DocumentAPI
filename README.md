# CodeChallenge-SQL2DocumentAPI 🖥️💾➡️📄  
REST API to store data from SQL database into a MongoDB Database 🗃️💻 ✨✨✨

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Project structure](#Project_structure)
- [Problem solving](#Problem_solving)

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
SQL_URL: SQL Database Domain
SQL_USER: your_sql_user
SQL_PASSWORD: your_password_sql
SQL_DBNAME: your_db
MONGO_URL: Mongo Database Domain
MONGO_USER: your_user_name
MONGO_PASSWORD: mongo_password
MONGO_DBNAME: mongo_db
```
if you're running locally use replace the following lines for:
```bash
SQL_URL: POSTGRESDB
MONGO_URL: MONGODB
```
5. Open a terminal/console, go to your app's folder path and run (for GNU/Linux):
```bash
docker compose up
```


## Usage

## Project structure


## Problem solving


