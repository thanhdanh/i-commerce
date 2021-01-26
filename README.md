# i-commerce

Project about simple e-commerce with microservice architecture. This project is a monorepo containing a [GraphQL](https://graphql.org/) API with back-end microservices built using the [NestJS](https://nestjs.com/) framework.

## Graph Model

![GraphQLModel](https://user-images.githubusercontent.com/11265773/105785631-f0458180-5fad-11eb-80de-8f8dfd3c62ee.png)

## How to Run

### Pre-requisites
You must install the following on your local machine:

1. Node.js (v14.x recommended)
2. Nestjs-CLI
3. Docker
4. Docker Compose


### Running

1. On the Terminal, execute `npm install`. The start script will install all npm dependencies for all projects, lint the code, transpile the code, build the artifacts (Docker images) and run all of them via `docker-compose`.

2. Once the start script is done, the GraphQL Playground will be running on [http://localhost:8100](http://localhost:8100)