# Build a Storefront Backend

## Contents:

1-Description.

2-How To Use.

3-Built With.

4-Development.

## Description:

this is a create an online storefront to showcase products and browse an index of all products, see the specifics of a single product, and add products to order on a cart page. I have been building the API that will do that, and another coworker is building the frontend.

## How To Use:

1- Please create 2 databases and a user for each one and the password for these users to access the databases one to project and one for tests **and Port number for db is:(5432)** you can do that by set up database through PSQL terminal like that:

* to work in postgres: `psql postgres`.

* to create user: `CREATE USER username WITH PASSWORD 'userpass';`.

* to create databases: 

     *main database:`CREATE DATABASE dev_database;`.

     *test database: `CREATE DATABASE dev_database_test;`.

* grant user to databases:

     *to main db: `GRANT ALL PRIVILEGES ON DATABASE dev_database TO username;`.

     *to test db: `GRANT ALL PRIVILEGES ON DATABASE dev_database_test TO username;`.

2- Open a file: **(.example.env)** and enter your data as the following example then rename it to .env:

```
PORT= (your port)

POSTGRES_HOST= (your hosr)

POSTGRES_DB= (your database name)

POSTGRES_TEST_DB= (your database test name)

POSTGRES_USER= (your database user name)

POSTGRES_PASSWORD= (your password)

ENV=dev

BCRYPT_PASSWORD= ( your BCRYPT_PASSWORD)

SALT_ROUNDS= (your SALT_ROUNDS number)

TOKEN_SECRET= (your TOKEN_SECRET)
```
3- to build the project and use it do the following orders in terminal: 

* To install required packages: `npm install`.

* To create the tables of database by migrate: `db-migrate up`.

* to drop tables: `db-migrate up`.

* to run test: `npm run test`

* to start project development: `npm run start:dev`

* to run and start the project: `npm run start:prod`


## Built With:

1- Postgres for the database.

2- Node/Express for the application logic.

3- dotenv from npm for managing environment variables.

4- db-migrate from npm for migrations.

5- jsonwebtoken from npm for working with JWTs.

6- jasmine from npm for testing.

7- TypeScript - The language used.

## Development:
 * Haitham Elsherbiny.
