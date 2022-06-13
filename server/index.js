const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const path = require('path')
const fs = require('fs');
const rootRouter = require("./routes/router")


const Group = require("./models/groupModel")

const PORT = process.env.PORT || 3001;

const app = express();

//set database based on test or prod
if (process.env.npm_lifecycle_script == "mocha") {
  dotenv.config({ path: __dirname + '/test-config.env' })
} else {
  dotenv.config({ path: __dirname + '/config.env' })

}
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true
}).then(connectionObject => {
  console.log("DB connection successful")
})

const parseUserInput = () => {
  let rawdata = fs.readFileSync(__dirname + '/data/input.json');
  let jsonGroups = JSON.parse(rawdata)
  let tempGroup;
  Object.keys(jsonGroups).map((group) => {
    tempGroup = new Group({
      groupName: group,
      users: Object.keys(jsonGroups[group]).map((user) => {
        return {

          userName: user,
          userColor: jsonGroups[group][user]
        }
      })
    })
    tempGroup.save().then(document => {
      console.log("saved document")
    }
    ).catch(e => { console.log(e) })
  });
}
//parseUserInput()

app.use("/api/v1", rootRouter)
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"))

})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app //for testing 