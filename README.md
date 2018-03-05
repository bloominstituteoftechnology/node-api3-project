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

Download Postman.  You'll be using this to verify that you're routes are working properly.
Download `nodemon` using `npm i -g nodemon`.
Create a new folder and run `npm init` to create your `package.json` file.
Install npm packages: `npm i --save express body-parser`
Create a server that makes the following routes function properly.
* [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id` property.
* [GET] `/search?name=<query>` The query parameter passed to this route should specify the name of the user you are searching for.  Return an array of all users whose names match the name provided.  This search should not be case sensitive.
* [DELETE] `/users/:id` This route should delete the specified user.
Your user objects can take any form.  Just ensure that they have an `id` property.  You can generate this `id` property on the server any way you like.
