/*
- `logger()`

  - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
  - this middleware runs on every request made to the API

- `validateUserId()`

  - this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.

  - if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
  - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`

- `validateUser()`

  - `validateUser` validates the `body` on a request to create or update a user
  - if the request `body` is missing, respond with status `400` and `{ message: "missing user data" }`
  - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`

- `validatePostId()`

  - this middleware will be used for all post endpoints that include an `id` parameter in the url (ex: `/api/posts/:id` and it should check the database to make sure there is a post with that id.

  - if the `id` parameter is valid, store the post object as `req.post` and allow the request to continue
  - if the `id` parameter does not match any post id in the database, respond with status `404` and `{ message: "post not found" }`

- `validatePost()`

  - `validatePost` validates the `body` on a request to create a new post
  - if the request `body` is missing, respond with status `400` and `{ message: "missing post data" }`
  - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`

*/