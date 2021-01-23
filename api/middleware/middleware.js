const Posts = require('../posts/posts-model.js')




function logger(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!

}

 function validatePostId(req, res, next) {
  // do your magic!
  res.set('X-Validating-Header','si');
  try{


    /*
    (node:696359) UnhandledPromiseRejectionWarning: RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: validatePostId 500 errord
    at ServerResponse.writeHead (_http_server.js:255:11)
    at ServerResponse._implicitHeader (_http_server.js:246:8)
    at write_ (_http_outgoing.js:685:9)
    at ServerResponse.end (_http_outgoing.js:798:5)
    at ServerResponse.send (/var/www/lambda/Unit4-Nodejs/Section1/middleware/node-api3-project/node_modules/express/lib/response.js:221:10)
    at ServerResponse.json (/var/www/lambda/Unit4-Nodejs/Section1/middleware/node-api3-project/node_modules/express/lib/response.js:267:15)
    at validatePostId (/var/www/lambda/Unit4-Nodejs/Section1/middleware/node-api3-project/api/middleware/middleware.js:34:21)
    at Layer.handle [as handle_request] (/var/www/lambda/Unit4-Nodejs/Section1/middleware/node-api3-project/node_modules/express/lib/router/layer.js:95:5)
    at next (/var/www/lambda/Unit4-Nodejs/Section1/middleware/node-api3-project/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/var/www/lambda/Unit4-Nodejs/Section1/middleware/node-api3-project/node_modules/express/lib/router/route.js:112:3)
(node:696359) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)

When using await async for id this error happens
    */
    const id =   Posts.getById(req.params.id)
    
    if (id) {
      req.posts = id;
      console.log(req.posts);
      next();
    }else{
      res.status(404).json(`validatePostId with ${req.params.id} not found`)
    }
  }
  catch(er){
    res.status(500).json('validatePostId 500 errord',er)
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body;
  if (text){
    next();
  } else{
    res.status(400).json({
      error: "ValidatePost 400 please provide text here"
    })
  }
}

// do not forget to expose these functions to other modules
module.exports = { validatePost, validatePostId }