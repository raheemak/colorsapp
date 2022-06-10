const express = require("express");
const { modelNames } = require("mongoose");
const groupController = require("../controllers/groupController")

const rootRouter = express.Router()

rootRouter.route('/colors')
    .get(groupController.getAllColors);

rootRouter.route("/color/:color")
.get (groupController.getUsersByColor)


rootRouter.route("/color")
.get (groupController.getAllUsersByColor)

rootRouter.route ("/user")
.post (groupController.addUser)
module.exports =  rootRouter;