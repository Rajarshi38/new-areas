# Backend Server for PropFinder

**Note** - because I am on free plan this link gets unactive after some time it is not used. so first time will take time

deployed link - [server](https://reunion-api-xq0y.onrender.com/api)

##Endpoints

- POST /api/auth/login - Login user
- POST /api/auth/signup - Register user
- GET /api/list-properties - Get all properties
- POST /api/property - Add a Property
- GET /api/property - Fetch all properties belong to a user
- PUT /api/property/:id - Update a particular property which belonged to a user
- DELETE /api/property/:id - Delete a particular property which belonged to a user.

## Technologies used

- Express.js
- MongoDB

## to run locally

- do `npm install` to install the dependencies
- run `npm run server` to run the server

## Env vars

JWT_SECRET
MONGODB_URI=
PORT=
FRONTEND_URL=
NODE_ENV=
NODE_VERSION=
