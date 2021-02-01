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
- [Mornitoring](#mornitoring)
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