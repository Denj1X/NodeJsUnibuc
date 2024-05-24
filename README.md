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

#### Database schema:

After I used ```dbml-generator``` in order to receive a ```dbml``` file, the database schema/flow chart was on ```https://dbdiagram.io/d```:

![image](https://github.com/Denj1X/Restaurant-Basic-RestAPI/assets/91908820/e5220ddc-1532-41b3-b6d8-837fbc1bcb23)

# AUTH 
### POST: http://localhost:3000/auth/register
  Used for creating an account.
  Request body:
  ``` json
    {
    "name": <String>,
    "email": <String>,
    "password": <String>
   }
  ```
  It will check if already exists an user with given email. If yess, will throw an eror.
  Otherwise, it will return the authentication token. (used lately to perform some actions).

### POST: http://localhost:3000/auth/login
  Used for login.
  Request body:
  ``` json
    {
    "email": <String>,
    "password": <String>
   }
  ```
   Will return a token.


# Hotels
### POST: http://localhost:3000/hotels/add
  Used for adding a new hotel.
  Request body: 
 ``` json
 {
   "name": <String>,
   "description": <String>,
   "stars": <Integer>,
   "rating": <Float>,
   "location": <String>,
   "available_rooms": <Integer>,
   "allowPets": <Boolean>,
   "parking": <Boolean>
 }
 ```
 You must be an Admin to perform this action.
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).

 If you have completed the request successfully, you will receive a (201 CREATED) response status and, in response body, the JSON for the created hotel, otherwise you will get a specific error.

 
