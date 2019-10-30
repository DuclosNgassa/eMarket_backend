const express = require("express");
const router = express.Router();

const User = require('../models/User');

//Insert User
router.post('/', async (req, res, next) => {
    const {name, email, phone_number, created_at, rating, user_status} = req.body;
    console.log('Create user');
    try {
        let newUser = await User.create({
            name,
            email,
            phone_number,
            created_at,
            rating,
            user_status
        }, {
            fields: ["name", "email", "phone_number", "created_at", "rating", "user_status"]
        });
        if (newUser) {
            res.send({
                result: 'ok',
                data: newUser
            });
        } else {
            res.send({
                result: 'failed',
                data: {},
                message: `Insert a new User failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: {},
            message: `Insert a new User failed. Error: ${error}`
        });
    }
});

//Update User
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {name, email, phone_number, created_at, rating, user_status} = req.body;
    try {
        let users = await User.findAll({
            attributes: ['id', 'name', 'email', 'phone_number', 'created_at', 'rating', 'user_status'],
            where: {
                id
            }
        });
        if (users.length > 0) {
            users.forEach(
                async (user) => {
                    await user.update({
                      name: name ? name : user.name,
                      email: email ? email : user.email,
                      phone_number: phone_number ? phone_number : user.phone_number,
                      created_at: created_at ? created_at : user.created_at,
                      rating: rating ? rating : user.rating,
                      user_status: user_status ? user_status : user.user_status,
                    });
                });
            res.json({
                result: 'ok',
                data: users,
                message: 'Update user successfully'
            });
        } else {
            res.json({
                result: 'failed',
                data: users,
                message: "Cannot find user to update"
            });
        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find user to update. Error: ${error}`
        });
    }
});

//Delete a User
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let numberOfdeletedRows = await User.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'ok',
            message: 'Delete a User successfully',
            count: numberOfdeletedRows
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a User failed. Error ${error}`,
            count: numberOfdeletedRows
        });
    }
});

//Query all Users from DB
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
          attributes: ['id', 'name', 'email', 'phone_number', 'created_at', 'rating', 'user_status'],
        });
        res.json({
            result: 'ok',
            data: users,
            length: users.length,
            message: "Query list of Users successfully"
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: [],
            length: 0,
            message: `Query list of Users failed. Error ${error}`
        });
    }
});

//Query User by given id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        let users = await User.findAll({
          attributes: ['id', 'name', 'email', 'phone_number', 'created_at', 'rating', 'user_status'],
            where: {
                id: id
            },
        });
        if (users.length > 0) {
            res.json({
                result: 'ok',
                data: users[0],
                message: "Query User by id successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Query User by id failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query User by id failed. Error ${error}`
        });
    }
});

router.get('/email/:email', async (req, res, next) => {
    const {email} = req.params;
    console.log('Find user');
    try {
        let users = await User.findAll({
          attributes: ['id', 'name', 'email', 'phone_number', 'created_at', 'rating', 'user_status'],
            where: {
                email: email
            },
        });
        if (users.length > 0) {
            res.json({
                result: 'ok',
                data: users[0],
                message: "Query User by email successfully"
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: "Query User by email failed. Error"
            });
        }

    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query User by email failed. Error ${error}`
        });
    }
});

module.exports = router;