const Group = require("../models/groupModel")

exports.getAllColors = async (req, res) =>  {
    const result = await Group.distinct('users.userColor')
    res.json({ "colors": result })
}

exports.getUsersByColor = async (req, res) => {
    const result = await Group.aggregate([
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
    ])
    let groupedUsers = {};
    //format data returned from aggregate function 
    result.map(group => groupedUsers[group._id] = group.users.map(user => { return user.userName }))
    res.json({ "groups": groupedUsers })
}

exports.getAllUsersByColor = async (req, res) => {
    let groupedUsers = {};
    const result = await Group.aggregate([
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
    ]);

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
}

exports.addUser = async (req, res) => {

    var username = req.query.username
    var group = req.query.group
    var color = req.query.color
    var userFound = false;

    //try to update user, will return null if user not found  
    let result = await Group.findOneAndUpdate({ 'users.userName': username }, { $set: { 'users.$.userColor': color } })
    if (result) {
        userFound = true;
        res.json({ "username": username, "group": result.groupName, "color": color })
        return;
    }

    //add new user to exisiting group, will return null if group not found...
    if (!userFound) {
        result = await Group.findOneAndUpdate({ 'groupName': group }, { $push: { users: { userName: username, userColor: color } } })
        if (result) {
            userFound = true;
            res.json({ "username": username, "group": result.groupName, "color": color })
            return;
        }
    }

    //if user still not found, create new group with user 
    if (!userFound) {

        const newGroup = new Group({
            groupName: group,
            users: [{ userName: username, userColor: color }]
        })

        result = await newGroup.save()
        res.json({ "username": username, "group": result.groupName, "color": color })
        return;
    }
}