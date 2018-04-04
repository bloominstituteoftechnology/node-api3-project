# Building and API using a Node.js and Express

## Topics

* Building RESTful APIs.
* Performing CRUD Operations on Multiple Resources.
* Configuring CORS.
* Writing Custom Middleware.
* Using Express Routers to Modularize Application.

## Assignment

Use Node.js and Express to design and build an API that performs CRUD operations on **users, posts and post tags**. Write custom middleware to ensure that the _tags_ are uppercased before they are processed by the request handlers.

### Download Project Files and Install Dependencies

* **Fork** and **Clone** this repository.
* **CD into the folder** where you cloned the repository.
* Do your magic!

### Implement Requirements

* Take the steps necessary to create a `package.json` to keep a record of our dependencies.
* use _yarn_ or _npm_ to add **knex** and **sqlite3** as dependencies to the project. **This is required for database access**.
* Configure an _npm script_ named _"start"_ that will execute your code using _nodemon_ so that the server restarts on changes. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
* Design and build a set of endpoints that satisfy the API requirements.
* **Use _Postman_ to test the API as you work through the exercises.**

### Database Persistence Helpers

The `/data/helpers` folder includes helper files you can use to manage the persistence of the users, posts and tags resources. These files are `userDb.js`, `postDb.js` and `tagDb.js`. All three of them publish the following api, that you can use to store, modify and retrieve each resource:

* `get()`: calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if found.
* `insert()`: calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: `{ id: 123 }`.
* `update()`: accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
* `remove()`: the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, it returns the number of records deleted.

The `postDb.js` helper includes an extra method called `getPostTags()` that when passed a post id as it's only argument, returns a list of all the _tags_ for the post.

The `userDb.js` helper includes an extra method called `getUserPosts()` that when passed a user id as it's only argument, returns a list of all the posts for the user.

**All these helper methods return promises.**

#### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database file (`lambda.sqlite3`) is described below.

##### Users

* id: number, no need to provide it when creating users, the database will generate it.
* name: up to 128 characters long, required.

##### Posts

* id: number, no need to provide it when creating posts, the database will automatically generate it.
* userId: number, required, must be the id of an existing user.
* text: string, no size limit, required.

##### Tags

* id: number, no need to provide it when creating tags, the database will generate it.
* tag: string up to 80 characters long, must be a unique value.

We have provided test data for all the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Design and Build Endpoints

Design and build the necessary endpoints to:

* perform CRUD operations on _users_, _posts_, and _tags_.
* retrieve the list of posts for a user.
* retrieve the list of tags for a post.

## Stretch Goal

* Use `create-react-app` to create an application inside the root folder, name it `client`.
* From the React application connect to the `/api/users` endpoint in the API and show the list of users.
* Add functionality required to show the details of a user, including their posts, when clicking on a user name on the list. Use React Router to navigate to a `/users/:id` route to show the user details.
* Add styling!
