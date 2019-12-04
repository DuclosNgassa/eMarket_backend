const UserNotification = require('../models/UserNotification');

exports.create = async function (req, res, next) {
    const {title, message, useremail, created_at} = req.body;
    try {
        await UserNotification.create({
            title,
            message,
            useremail,
            created_at
        }, {
            fields: ["title", "message", "useremail", "created_at"]
        }).then(userNotification => {
            res.send({
                result: 'ok',
                data: userNotification
            });
        });
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new UserNotification failed. Error: ${error}`
        });
    }
};

exports.readAll = async function (req, res, next) {
    try {
        await UserNotification.findAll({
            attributes: ['id', 'title', 'message', 'useremail', 'created_at'],
        }).then(userNotifications => {
                res.json({
                    result: 'ok',
                    data: userNotifications,
                    length: userNotifications.length,
                    message: "Query list of UserNotifications successfully"
                });
            }
        );
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of UserNotifications failed. Error ${error}`
        });
    }
};

exports.findById = async function (req, res, next) {
    const {id} = req.params;
    try {
        await UserNotification.findOne({
            attributes: ['id', 'title', 'message', 'useremail', 'created_at'],
            where: {
                id: id
            },
        }).then(userNotification => {
            res.json({
                result: 'ok',
                data: userNotification,
                message: "Query UserNotification by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query UserNotification by id failed. Error ${error}`
        });
    }
};

exports.findbyUserEmail = async function (req, res, next) {
    const {useremail} = req.params;
    try {
        await UserNotification.findAll({
            attributes: ['id', 'title', 'message', 'useremail', 'created_at'],
            where: {
                useremail: useremail
            },
        }).then(userNotifications => {
            res.json({
                result: 'ok',
                data: userNotifications,
                message: "Query UserNotification by useremail successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query UserNotification by useremail failed. Error ${error}`
        });
    }
};

exports.update = async function (req, res, next) {
    const {id} = req.params;
    const {title, message, useremail, created_at} = req.body;
    try {
        await UserNotification.findOne({
            attributes: ['id', 'title', 'message', 'useremail', 'created_at'],
            where: {
                id
            }
        }).then(async userNotification => {
            await userNotification.update({
                title: title ? title : userNotification.title,
                message: message ? message : userNotification.message,
                useremail: useremail ? useremail : userNotification.useremail,
                created_at: created_at ? created_at : userNotification.created_at
            }).then(userNotification => {
                res.json({
                    result: 'ok',
                    data: userNotification,
                    message: 'Update UserNotification successfully'
                });
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find UserNotification to update. Error: ${error}`
        });
    }
};

exports.delete = async function (req, res, next) {
    const {id} = req.params;
    try {
        await UserNotification.destroy({
            where: {
                id
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete a UserNotification successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a UserNotification failed. Error ${error}`,
        });
    }
};

exports.deleteByUseremail = async function (req, res, next) {
    const {useremail} = req.params;
    try {
        await UserNotification.destroy({
            where: {
                useremail: useremail
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete UserNotification by useremail successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a UserNotification  by useremail failed. Error ${error}`,
        });
    }
};
