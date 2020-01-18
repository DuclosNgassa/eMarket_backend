const Message = require('../models/Message');

exports.create = async function (req, res, next) {
    const {sender, receiver, created_at, postid, body, read} = req.body;
    try {
        let newFavorit = await Message.create({
            sender,
            receiver,
            created_at,
            postid,
            body,
            read
        }, {
            fields: ["sender", "receiver", "created_at", "postid", "body", "read"]
        });
        if (newFavorit) {
            res.send({
                result: 'ok',
                data: newFavorit
            });
        } else {
            res.send({
                result: 'failed',
                data: {},
                message: `Insert a new Message failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new Message failed. Error: ${error}`
        });
    }
};

exports.readAll = async function (req, res, next) {
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
        }).then(messages => {
            res.json({
                result: 'ok',
                data: messages,
                length: messages.length,
                message: "Query list of Messages successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Messages failed. Error ${error}`
        });
    }
};

exports.findById = async function (req, res, next) {
    const {id} = req.params;
    try {
        await Message.findOne({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                id: id
            },
        }).then(message => {
            res.json({
                result: 'ok',
                data: message,
                message: "Query Message by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Message by id failed. Error ${error}`
        });
    }
};

exports.findByPostId = async function (req, res, next) {
    const {postid} = req.params;
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                postid: postid
            },
        }).then(messages => {
            res.json({
                result: 'ok',
                data: messages,
                message: "Query Message by postid successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Message by postid failed. Error ${error}`
        });
    }
};

exports.findByEmail = async function (req, res, next) {
    const {email} = req.params;
    try {
        let messageSent = await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                sender: email
            }
        });

        console.log("findByEmail -> messageSent: " + JSON.stringify(messageSent));

        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                receiver: email
            }
        }).then(messages => {

            let allMessage = messages.concat(messageSent);
            res.json({
                result: 'ok',
                data: allMessage,
                message: "Query Message by email successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Message by email failed. Error ${error}`
        });
    }
};

exports.findBySenderEmail = async function (req, res, next) {
    const {sender} = req.params;
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                sender: sender
            },
        }).then(messages => {
            res.json({
                result: 'ok',
                data: messages,
                message: "Query Message by sender successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Message by sender failed. Error ${error}`
        });
    }
};

exports.findByReceiverEmail = async function (req, res, next) {
    const {receiver} = req.params;
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                receiver: receiver
            },
        }).then(messages => {
            res.json({
                result: 'ok',
                data: messages,
                message: "Query Message by receiver successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Message by receiver failed. Error ${error}`
        });
    }
};

exports.update = async function (req, res, next) {
    const {id} = req.params;
    const {sender, receiver, created_at, postid, body, read} = req.body;
    try {
        await Message.findOne({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body', 'read'],
            where: {
                id
            }
        }).then(async message => {
            await message.update({
                sender: sender ? sender : message.sender,
                receiver: receiver ? receiver : message.receiver,
                created_at: created_at ? created_at : message.created_at,
                postid: postid ? postid : message.postid,
                body: body ? body : message.body,
                read: read ? read : message.read
            });

            res.json({
                result: 'ok',
                data: message,
                message: 'Update Message successfully'
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find Message to update. Error: ${error}`
        });
    }
};

exports.delete = async function (req, res, next) {
    const {id} = req.params;
    try {
        await Message.destroy({
            where: {
                id
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete a Message successfully',
                count: numberOfdeletedRows
            });
        });

    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Message failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
};

exports.deleteByPostId = async function (req, res, next) {
    const {postid} = req.params;
    try {
        await Message.destroy({
            where: {
                postid
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete Message by Postid successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Message  by Postid failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
};