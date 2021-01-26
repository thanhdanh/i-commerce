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
1. Build docker images: product and gateway: `docker-compose build`
2. Start all services by: `docker-compose up -d`
3. Once the start script is done, the GraphQL Playground will be running on [http://localhost:8100/graphql](http://localhost:8100/graphql)
4. Query products:
```
curl --location --request POST 'http://localhost:8100/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"# Write your query or mutation here\n{\n  products(orderBy: \"-price\", filterBy: \"{\\\"price\\\":{\\\"lte\\\": 100000,\\\"gte\\\": 100000}}\") {\n    id\n    name\n  }\n}\n","variables":{}}'
```