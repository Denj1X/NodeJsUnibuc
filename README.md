# Restaurant Basic Rest API

This project is the backend part for a booking application. Within it, a user can see the available restaurants, their tables and make a reservation. To make a reservation, authentication is required. The roles available on the application are:
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


# Restaurants
### POST: http://localhost:3000/restaurants/add
  Used for adding a new restaurant.
  Request body: 
 ``` json
 {
   "name": <String>,
   "description": <String>,
   "stars": <Integer>,
   "rating": <Float>,
   "location": <String>,
   "available_tables": <Integer>,
   "allowPets": <Boolean>,
   "parking": <Boolean>
 }
 ```
 You must be an Admin to perform this action.
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).

 If you have completed the request successfully, you will receive a (201 CREATED) response status and, in response body, the JSON for the created restaurant, otherwise you will get a specific error (400 BAD REQUEST as an example).

### GET: http://localhost:3000/restaurants/
  
  Available for all users, even not authenticated. <br>
  Returns all restaurants matching your arguments. (If no arguments presented, it will return absolutely all restaurants).
  
  Arguments:
  ```
    stars: <Number>
    parking: <Boolean>
    allowPets: <Boolean>
    location: <String>
    orderBy: <Column name> - used for sorting
    sord: <asc/desc> - sorting direction (optional, if not included, default value will be asc)
  ```
  Complete query with parameters example:  
  ```
  http://localhost:3000/restaurants?stars=3&orderBy=rating&sort=desc
  ```
- will return all restaurants with 3 stars, sorted by rating in descending order.

### GET: http://localhost:3000/restaurants/:id

  Available for all users, even not authenticated. <br>
  Returns the restaurant with the specified ID

### PUT: http://localhost:3000/restaurants/update/:id

 Used for updating an existing restaurant. <br>
 You must be an Admin to perform this action.  <br>
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
 If you have completed the request successfully, you will receive a (200 OK) response status and, in response body, the JSON for the updated restaurant, otherwise you will get a specific error. <br>

 Request body: 
 ``` json
 {
   "name": <String>,
   "description": <String>,
   "stars": <Integer>,
   "rating": <Float>,
   "location": <String>,
   "available_tables": <Integer>,
   "allowPets": <Boolean>,
   "parking": <Boolean>
 }
 ```

### DELETE: http://localhost:3000/restaurants/delete/:id

  Used for deleting an existing restaurant. <br>
  You must be an Admin to perform this action.  <br>
  If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
  If you have completed the request successfully, you will receive a (200 OK) response status, otherwise you will get a specific error. <br>

 

# TABLES

### POST: http://localhost:3000/tables/add

  Used for adding a new table. <br>
  Request body: 
 ``` json
 {
   "number": <Number>,
   "floor": <Number>,
   "max_capacity": <Number>,
   "available": <Boolean>,
   "restaurantId": <Number>,
   "allowPets": <Boolean>,
   "offersParkingSpot": <Boolean>,
   "fee": <Float>
 }

 ```
 The other columns of the entity will be set automatically based on those provided in the request body. For example, reservedOn will be null until a reservation is made, and availableFrom will have the current date.

 You must be an Admin to perform this action.  <br>
 If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
 If you have completed the request successfully, you will receive a (201 CREATED) response status and, in response body, the JSON for the created table, otherwise you will get a specific error.

### GET: http://localhost:3000/tables/
  
  Available for all users, even not authenticated. <br>
  Returns all tables matching your arguments. (If no arguments presented, it will return absolutely all tables).
  
  Arguments:
  ```
    restaurantId: <Number>
    available: <Boolean>
    allowPets: <Boolean>
    offersParkingSpot: <Boolean>
    fee: <Number>
    orderBy: <Column name> - used for sorting
    sord: <asc/desc> - sorting direction (optional, if not included, default value will be asc)
  ```
  Complete query with parameters example:  
  ```
  http://localhost:3000/tables?restaurantId=4&orderBy=fee&sort=desc
  ```
   - will return all tables from Restaurant with id 4, sorted by fee in descending order. 

### GET: http://localhost:3000/tables/:id

  Available for all users, even not authenticated. <br>
  Returns the table with the specified ID

### PUT: http://localhost:3000/tables/update/id
   Used for updating an existing table. <br>
   You must be an Admin to perform this action.  <br>

   ``` json
      {
    "number": <Number>,
    "floor": <Number>,
    "max_capacity": <Number>,
    "available": <Boolean>,
    "reservedOn": <DateTime>,
    "availableFrom": <DateTime>,
    "restaurantId": <Number>,
    "allowPets": <Boolean,
    "offersParkingSpot": <Boolean>,
    "fee": <Float>
    }
   ```


### DELETE: http://localhost:3000/tables/delete/:id

  Used for deleting an existing table. <br>
  You must be an Admin to perform this action.  <br>
  If you're an Admin, use your Bearer Token (In Postman, click on request, open Authorization tab -> Bearer Token and insert your token).  <br>
  If you have completed the request successfully, you will receive a (200 OK) response status, otherwise you will get a specific error. <br>



# RESERVATION

### POST: http://localhost:3000/reservations/add

  Used for adding a new reservations. <br>
  Available only for authenticated users. <br>

  Request body:
  ``` json
    {
    "restaurantId": <Number>,
    "tableId": <Number>,
    "number_of_people": <Number>,
    "hasPets": <Boolean>,
    "needParkingSpot": <Boolean>,
    "reservationEndDate": <DateTime>
   }  
  ```
  The other columns of the entity will be set automatically based on those provided in the request body. <br>
  In addition, when a reservation is created, the tables and Restaurant tables will also be modified.
  
  ```
    In the Tables table: - the "available" column will receive the value false
                        - the "reservedOn" column receives the current date
                        - the "availableFrom" column receives the value from the "reservationEndDate" field of the request

    In the Restaurant table: - the value of the "available_tables" column is decremented
  ```

### GET: http://localhost:3000/reservations/
  Returns all reservations. <br>
  Only admins can use that.

### GET: http://localhost:3000/reservations/:id
  Returns an existing reservation. <br>
  Only admins and user that created it can perform this action.

### PATCH: http://localhost:3000/reservations/update/:id
  Update the end date of the reservation and the fee. If you want to change data such as userId, restaurantId, tableId, you need to make a new reservation (to delete the current one /delete/:id, and to add a new one, /add) <br>
  Only admins and user that created it can perform this action. <br>
  Request body:
  ``` json
    {
    "reservationEndDate": <DateTime>
    }
  ```
  Fee will be updated automatically.

### DELETE: http://localhost:3000/reservations/delete/:id
  Used for deleting an existing reservation. <br>
  Only the user that created it or an admin can perform this operation.
