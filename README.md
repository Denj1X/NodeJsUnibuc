# Restaurant Basic Rest API

This project is the backend part for a booking application. Within it, a user can see the available hotels, their rooms and make a reservation. To make a reservation, authentication is required. The roles available on the application are:
  - USER (Has access to GET methods, has the right to modify/delete his own reservation)
  - ADMIN (Full access to the application).
    Authentication is done using Bearer Token.

#### Project structure:
  ```
    - controllers  
    - middlewares
    - prisma (here you can adjust database schema and see migrations)
    - routes
    .env
    parser.js
    server.js
    .package-lock-json
    .package.json
    README.md
```

#### First steps:
```
1. Clone this repository.
2. Modify the .env file as follows:
  - DATABASE_URL="" - insert your database connection string
  - SECRET_KEY="" - insert one key for bcrypt.
3. Check all routes ad add them on applications like Postman.
4. Check documentation to see all requirements for requests (correct form, arguments, request body, etc).
```

