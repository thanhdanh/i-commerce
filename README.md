# i-commerce

Project is a simple e-commerce applying with microservice architecture. This project is a monorepo containing a [GraphQL](https://graphql.org/) API with back-end microservices built using the [NestJS](https://nestjs.com/) framework.

- [Overview](#overview)
    - [1. Requirements](#1-requirements)
    - [2. System design](#2-system_design)
    - [3. Data Model](#3-data_model)
        - [Product Service](#product-service)
        - [Tracking Service](#tracking-service)
        - [User Service](#tracking-service)
- [How to run](#howtorun)
- [Demo](#demo)
    - [1. Query products](#1-query_products)
    - [2. View product detail](#2-view_product_detail)
    - [3. Admin login](#3_admin_login)
    - [4. Add new product](#4_add_new_product)
    - [5. Update product](#5_update_product)
- [Monitoring](#monitoring)
- [References](#references)

## Overview

### 1. Requirements
A small start-up named "iCommerce" wants to build an online shopping application to sell their products. In order to get to the market quickly, they just want to build a version with a very limited set of functionalities:
+ a. A single web page application that shows all products on which customer can
filter, sort and search for products based on different criteria such as name, price, branch, color etc.
+ b. A backend side to serve requests from web application such as show products, filter, sort and search.
+ c. If customer finds a product that they like, they can only place order by calling to the company's Call Centre.
+ d. To support sale and marketing, all customers' activities such as searching, filtering and viewing product's details need to be stored in the database.
+ e. No customer registration is required.
+ f. No online payment is required.

### 2. System design
Our system have many services and 1 transporter, which are responsible for transmitting messages between different microservice instances. Most transporters natively support both request-response and event-based message styles.

![High Level Design](documents/VDC_i_commerce-Arhcitecture.png)

- **API Gateway**: Public gateway to route requests to multiple services using a single endpoint. Gateway is also provide authentication and security feature to restrict accessing resource through issuance jwt access token.
- **Transporter**: implements the publish/subscribe messaging paradigm and leverages the Pub/Sub feature of Redis. Published messages are categorized in channels, without knowing what subscribers (if any) will eventually receive the message.
- **Product Service**: manages our products with CRUD operations. This service also provides the ability to allow user could filter, sort and search for products based on dynamic criteria.
- **Tracking Service**: records all customers activities (filtering, viewing product detail).
- **User Service**: records all users information, support for authentication.

### 3. Data Model
For each service, we discuss data schema and datastore considerations.
In general, we follow the basic principle of microservices is that each service manages its own data. Two services should not share a data store.

#### Product Service
The Product service stores information about all of our products. We use PostgreSQL.

![Product Schema](documents/VDC_i_commerce-Product_schema.png)

#### Tracking Service
The Tracking service records all customers activities through listening from the Product service. We use MongoDB

![Tracking Schema](documents/VDC_i_commerce-Tracking_schema.png)

#### User Service
The User service records all users informations. We use MongoDB

![User Schema](documents/VDC_i_commerce-User_schema.png)

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

## Demo

### 1. Query products

```
curl --location --request POST 'http://localhost:8100/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"# Write your query or mutation here\n{\n  products(orderBy: \"-price\", filterBy: \"{\\\"price\\\":{\\\"lte\\\": 100000,\\\"gte\\\": 100000}}\") {\n    id\n    name\n  }\n}\n","variables":{}}'
```

### 2. View product detail

curl --location --request POST 'http://localhost:8100/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"# Write your query or mutation here\n{\n  productDetail(\n      id: 3\n  ) {\n    id\n    name\n  }\n}\n","variables":{}}'

### 3. Admin login

curl --location --request POST 'http://localhost:8100/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {\n    login(\n        data: {\n            username: \"admin\",\n            password: \"secretverystrong\"\n        }\n    ) {\n        accessToken\n    }\n}","variables":{}}'

### 4. Add new product

curl --location --request POST 'http://localhost:8100/graphql' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYxMjE1NDU3MiwiZXhwIjoxNjEyMjQwOTcyfQ.yuxAxKUNiPExJyzaH5eSccdRjk-TNXBlXWZwewWDvF8' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {\n    addProduct(\n        data: {\n            name: \"SSD KLEVV Neo N400 120GB 2.5-Inch SATA III 3D-NAND (SK Hynix) K120GSSDS3-N40\",\n            price: 2000,\n            color: \"Black\",\n            categoryName: \"Gigabytes\"\n        }\n    ) {\n        id\n        name\n    }\n}","variables":{}}'

## Monitoring
The monitoring supports you with readiness / liveness health checks. Healthchecks are very important when it comes to complex backend setups. Each microserice will check its database.
To check health, we call API: http://localhost:8100/health

Result: 

![Health Result](documents/VDC_health_check.png)
