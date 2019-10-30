const express = require("express");
const router = express.Router();

const Message = require('../models/Message');

//Insert Message
router.post('/', async (req, res, next) => {
    const {sender, receiver, created_at, postid, body} = req.body;
    try {
        let newFavorit = await Message.create({
            sender,
            receiver,
            created_at,
            postid,
            body
        }, {
            fields: ["sender", "receiver", "created_at", "postid", "body"]
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
});

//Query all Messages from DB
router.get('/', async (req, res, next) => {
    try {
        const messages = await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body'],
        });
        res.json({
            result: 'ok',
            data: messages,
            length: messages.length,
            message: "Query list of Messages successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Messages failed. Error ${error}`
        });
    }
});

//Query Message by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Message.findOne({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body'],
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
});

//Query Message by given postid
router.get('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body'],
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
});

//Query Message by given sender
router.get('/sender/:sender', async (req, res, next) => {
    const {sender} = req.params;
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body'],
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
});

//Query Message by given receiver
router.get('/receiver/:receiver', async (req, res, next) => {
    const {receiver} = req.params;
    try {
        await Message.findAll({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body'],
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
});

//Update Message
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {sender, receiver, created_at, postid, body} = req.body;
    try {
        await Message.findOne({
            attributes: ['id', 'sender', 'receiver', 'created_at', 'postid', 'body'],
            where: {
                id
            }
        }).then(async message => {
            await message.update({
                sender: sender ? sender : message.sender,
                receiver: receiver ? receiver : message.receiver,
                created_at: created_at ? created_at : message.created_at,
                postid: postid ? postid : message.postid,
                body: body ? body : message.body
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
});

//Delete a Message
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let numberOfdeletedRows = await Message.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete a Message successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Message failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

//delete a Message by given postid
router.delete('/post/:postid', async (req, res, next) => {
    const {postid} = req.params;
    try {
        let numberOfdeletedRows = await Message.destroy({
            where: {
                postid
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete Message by Postid successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Message  by Postid failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

module.exports = router;