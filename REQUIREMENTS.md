# Storefront Backend Project

outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend.

## 1- the RESTful route for each endpoint listed:

* ### main route:

| endpoint      | request       |
|:-------------:|:-------------:|
|       /       | get           |

* ### users route

| route         | endpoint      | request       |
|:-------------:|:-------------:|:-------------:|
| index         | /users        | get           |
| show          | /users/:id    | get           |
| create        | /users        | post          |


* ### products route:

| route         | endpoint      | request       |
|:-------------:|:-------------:|:-------------:|
| index         | /product      | get           |
| show          | /product/:id  | get           |
| create        | /product      | post          |


* ### orders route:

| route         | endpoint            | request       |
|:-------------:|:-------------------:|:-------------:|
| index         | /order              | get           |
| show          | /order/:id          | get           |
| create        | /order              | post          |
| addProduc     | /orders/:id/products| post          |


## 2- database tables

* ### users table:

| column        | type                | releation     |
|:-------------:|:-------------------:|:-------------:|
| id            | SERIAL              | PRIMARY KEY   |
| first_name    | VARCHAR             |     ------    |
| last_name     | VARCHAR             |     ------    |
| password      | VARCHAR             |     ------    |

* ### products table:

| column        | type                | releation     |
|:-------------:|:-------------------:|:-------------:|
| id            | SERIAL              | PRIMARY KEY   |
| pro_name      | VARCHAR             |     ------    |
| price         | INTEGER             |     ------    |

* ### orders table:

| column        | type                | releation                |
|:-------------:|:-------------------:|:------------------------:|
| id            | SERIAL              | PRIMARY KEY              |
| status        | VARCHAR             |            ------        |
|user_id        | BIGINT REFERENCES   |foreign key to users table|

* ### orders_products table:

| column        | type                | releation                   |
|:-------------:|:-------------------:|:---------------------------:|
| id            | SERIAL              | PRIMARY KEY                 |
| quantity      | integer             |             ------          |
| order_id      | bigint REFERENCES   |foreign key to orders table  |
| product_id    | bigint REFERENCES   |foreign key to products table|