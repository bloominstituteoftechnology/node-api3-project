# LS-Node-Express

## Topics

* Node
* Express
* V8
* RESTful API
* GET
* POST
* req, res
* route parameters
* query parameters
* Postman
* body-parser

## Assignment

1. Download Postman from https://www.getpostman.com/  You'll be using this to verify that your routes are working properly.
2. Download `nodemon` using `npm i -g nodemon`.
3. Create a new folder and run `npm init` to create your `package.json` file.
4. Install NPM packages: `npm i --save express body-parser`
5. Create a server that makes the following routes function properly:

* [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id` property.
* [GET] `/search?name=<query>` The query parameter passed to this route should specify the name of the user you are searching for.  Return an array of all users whose names match the name provided.  This search should not be case sensitive.
* [DELETE] `/users/:id` This route should delete the specified user.

Your user objects can take any form.  Just ensure that they have an `id` property.  You can generate this `id` property on the server any way you like.
