// Q: What do I need to do?
// - Build an API that let's the client communuicate to the server and preform CRUD operation

// Q: What are the two Database Schemas I need to enable the client to communicate with? And what does the client need to be able to accomplish with each schema?
// - Users:
// - - Retrieve list of users
// - - Create new user
// - - Update specific user
// - - Delete specific user

// - Posts:
// - - Create new post to specific user
// - - Retrieve list of all post
// - - Retireve list of post from a specific user
// - - Delete a specific post from a specific user
// - - Update a specififc post from a specific user

// Q: What are this projects requirments?
// -  I need to enable communication with these database schemas by building 4 customm middleware functions.
// - Q: What are some of the custom middleware functions that I know I will need? And what each of them do? What are some of the "Data Presistence Helpers (DPH)" I can use for each one, and where will I access them from?
// - - logger(): will log each api request, 'request method', 'request url', and 'timestamp'
// - - - DPH's: n/a

// - - validateUserId(): validates the 'user id' upon every api request that expects a user id parameter. If the user id parameter is valid store the user object as req.user and it will be passed down the queue. If the id paramter does not match any user id in the database, cancel the request and respond with status 400 and a "{ message: "invalid user id" }"
// - - - DPH's: getById() from -> "users/userDb.js".

// - - validateUser(): validates the body of the request to create a new user. If any of the data values are missing on the request.body then cancel the request with status 400 and "{ message: "missing user data" }". If the request body is missing the required "name" field, cancel the request and respond with  status 400 and "{ message: "missing required name field" }"
// - - - DPH's: insert() from -> "users/userDb.js".

// - - validatePost(): validates the body on a request to create a new post. if the request body is missing then I will respond with a status code 400 and "{ message: "missing post data" }". If the request body is missing the required text field cancel the request and respond with status 400 and { message: "missing required text field" }
// - - - DPH's: insert() from -> "users/postDb.js".

// Q: What else will I need to for this project?
// - Routing: I will need to use route handler middleware to send request back to the client
// - Q: How many routing files will I need?
// - - userRoutes "/api/users"
// - - postsRoutes: "/api/users/posts" & "/api/users/:id/posts"
