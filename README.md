# Integrated Token-Based Authentication to a Password Generator

## Description
Integration of a React.js-based password generator manager with a Spring Security token-based authentication starter project, creating a full-stack application that requires users to authenticate using JSON Web Tokens (JWTs) in order to access the main page and /generatedPasswords/new REST endpoints.

## Credits and Contributions
This project combines two applications written by other developers. The first is a password-generator-manager written in React.js:
[https://github.com/Unfiled6748/mlh-ghw-2023/tree/main/password-generator-manager](https://github.com/Unfiled6748/mlh-ghw-2023/tree/main/password-generator-manager)

and the other is a Spring Security project that implements token-based authentication:
[https://github.com/serlesen/fullstack-jwt/tree/chapter_1/backend](https://github.com/serlesen/fullstack-jwt/tree/chapter_1/backend)

My contributions were to: 
1. Create a Login page
2. Create a Signup page
3. Combine the React and Spring applications to create a full-stack application

## Demo
<insert demo.mov here>

## Installation
1. Clone the repo: 
`https://github.com/Unfiled6748/password-generator-manager.git`
2. Go to the `frontend` directory, and run:
`npm install`
`npm run dev`
(Note: You may need to run `npm audi`t after `npm install`.)
This will start the frontend.
3. Create an `backend/src/main/resources/application.properties` file.
5. Insert the following, and replace the placeholders with your values:
```
spring.application.name=backend
security.jwt.token.secret-key: <insert-your-secret-key-here>
# Session Management Configuration
spring.security.filter.chain.content-negotiation.parameter-strategy=ignore
spring.security.filter.chain.any-request.authorized=permitAll
spring.security.filter.chain.request-matcher.path.pattern=/api/**
spring.security.filter.chain.request-matcher.path.authenticated=true

# CSRF Configuration
spring.security.csrf.disabled=true
# DataSource Configuration
spring.datasource.platform=postgres
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/backenddb
spring.datasource.username=<insert-your-postgresql-username-here>
spring.datasource.password=<insert-your-postgresql-password-here>
spring.datasource.initialization-mode=always

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create
```
5. Create a `postgresql` instance running on `localhost:5432`.
6. Create a database called `backenddb`:
`CREATE DATABASE backenddb;`
(Note: You  do not need to create any tables. When the backend starts, an `app_user` table will automatically get created.)
7. Go to the `backend` directory, and run `./mvnw spring-boot:run`.
This will start the backend.


## Features
- JSON Web Token-based (JWT) authentication
## Future Updates
- Enable TLS
- Store JWT tokens in HTTPOnly cookies so client-side Javascript cannot access them
- Move the addPassword and savePassword functionality from the frontend to the backend
- Replace IndexDB with PostgreSQL in the backend for stroing user's generated passwords
- Add Open ID Connect-based authentication (e.g.; 'Sign in via Google')



## License

BSD 3-Clause License


