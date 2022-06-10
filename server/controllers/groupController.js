const Group = require("../models/groupModel")

exports.getAllColors = (req, res) => {
    Group.distinct('users.userColor', (error, result) => {
        res.json({ "colors": result })
    });

}

exports.getUsersByColor = (req, res) => {
    const users = Group.aggregate([
        {
            '$unwind': '$users'
        }, {
            '$match': {
                'users.userColor': req.params.color
            }
        }, {
            '$project': {
                'userName': '$users.userName',
                'userColor': '$users.userColor',
                'groupName': '$groupName'
            }
        }, {
            '$group': {
                '_id': '$groupName',
                'users': {
                    '$push': {
                        'userName': '$userName',
                    }
                }
            }
        }
    ], (error, result) => {
        let groupedUsers = {};
        //format data returned from aggregate function 
        result.map(group => groupedUsers[group._id] = group.users.map(user => { return user.userName }))
        res.json({ "groups": groupedUsers })
    })
}

exports.getAllUsersByColor = (req, res) => {
    let groupedUsers = {};
    const groups = Group.aggregate([
        {
            '$unwind': '$users'
        }, {
            '$project': {
                'userName': '$users.userName',
                'userColor': '$users.userColor',
                'groupName': '$groupName'
            }
        }, {
            '$group': {
                '_id': {
                    'userColor': '$userColor',
                    'groupName': '$groupName'
                },
                'users': {
                    '$push': {
                        'userName': '$userName'
                    }
                }
            }
        }
    ], (error, result) => {
        result.map(colorGroup => {
            //format result returned from  aggregate function 
            let tempObj = {}
            tempObj[colorGroup._id.groupName] = colorGroup.users.map(user => { return user.userName })
            if (groupedUsers[colorGroup._id.userColor])

                groupedUsers[colorGroup._id.userColor].push(tempObj)
            else {
                groupedUsers[colorGroup._id.userColor] = [tempObj]
            }
        })
        res.json({ "result": groupedUsers })
    })
    //.colors.map ((color)=>{allUsers.push (this.getUsersByColor({params: {color}}, {}))})
}

exports.addUser =  (req, res) => {

    var username = req.query.username
    var group = req.query.group
    var color = req.query.color
    var userFound = false;

    //try to update user, will return null if user not found  
     Group.findOneAndUpdate({ 'users.userName': username }, { $set: { 'users.$.userColor': color } }, (err, result) => {
        if (err) {
            console.log(err)
            console.log("error")
        }
        else {
            console.log ("one")
            if (result) {
                console.log(result)
                userFound = true;
                res.json({ "username": username, "group": result.groupName, "color": color })
                console.log("in mongodb  response for user found")
                return;
            }
        }
    })

    //add new user to exisiting group, will return null if group not found...
    if (!userFound) {
        console.log("user not found ")

         Group.findOneAndUpdate({ 'groupName': group }, { $push: { users: { userName: username, userColor: color } } }, (err, result) => {
            if (err)
                console.log(err)
            else {
                console.log ("Two")
                if (result) {
                console.log("in mongodb  response for group found")
                console.log(result)
                userFound = true;
                res.json({ "username": username, "group": result.groupName, "color": color })
                return;
                }
            }
        })
    }
    //if user still not found, create new group with user 

    if (!userFound) {
        console.log("user not found and group not found")
        const newGroup = new Group({
            groupName: group,
            users: [{ userName: username, userColor: color }]
        })

         newGroup.save().then(result => {
            console.log(document)
            console.log("in mongodb  response for new user created")

            res.json({ "username": username, "group": result.groupName, "color": color })
            return;
        }
        ).catch(e => { console.log(e) })
    }
}