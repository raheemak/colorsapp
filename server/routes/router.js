const express = require("express");
const groupController = require("../controllers/groupController")

const { expressjwt: jwt } = require("express-jwt");

const jwks = require('jwks-rsa');


const rootRouter = express.Router()


var jwtCheck = jwt({secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-nze5vfxy.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://colorsappraheema.herokuapp.com/',
  issuer: 'https://dev-nze5vfxy.us.auth0.com/',
  algorithms: ['RS256']
});

  
rootRouter.use (jwtCheck); 
  

rootRouter.route('/colors')
    .get(groupController.getAllColors);

rootRouter.route("/color/:color")
.get (groupController.getUsersByColor)


rootRouter.route("/color")
.get (groupController.getAllUsersByColor)

rootRouter.route ("/user")
.post (groupController.addUser)
module.exports =  rootRouter;