## Deployment notes
# Steps
1. create an empty repo on Github
2. Clone it + open in editor
3. Create a default package.json by typing `npm init -y`
4. Add the package-lock.json file and node_modules `npm i express`
5. Check the folders by `git status` => node_modules and package-lock.json
6. `npx gitignore node` to generate a `.gitignore` super file ==> `npx` lets you run a npm package without downloading npm
7. Check the folders by `git status` => node_modules is no longer listed (but appears in the VSC)
8. Create a index.js file: `touch index.js`
9. Manually add this to `package.json`

```js
  "scripts": {
    "start": "node index.js"
  }
```
10. Add console.log("\n ***index.js ran*** \n"); in `index.js`, to simply test it's working
11. Run `npm start`, and it should show ***index.js ran*** running in the terminal
12. Create the server in `index.js`
```js
const express = require('express');
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
    const songs = [{ id: 1, name: "Final Countdown" }];
    res.status(200).json(songs);
});
const port = 5000;
server.listen(port, () => console.log(`\n** Running on port ${port}`))
```
12. To keep the server running without restarting each time, install `npm i -D nodemon`
13. `Commit` changes and `push` to Master
13. Next, we go to deployment. *heroku.com*
14. Heroku.com => `create app`
15. Name it, and connect to `Github` (click accept)
16. Connect to the `Github repo` you chose => `connect`
17. If it throws you an error => disconnect and reconnect to the correct `repo`