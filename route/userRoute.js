const express = require('express')
const router = express.Router()
const User = require('../controller/userController');
const Token = require('../middleware/verifyToken')
const AllawedTo = require('../middleware/AllawedTo')
const userRoles = require('../Utils/user.Roles')
router.get('/users',Token.verifyToken,AllawedTo(userRoles.ADMIN,userRoles.MANAGER),User.ALLuser)
router.post('/login',User.Logen)
router.post('/register',User.register)

// ==============================================================//
// router.route('/register')
//                 .post(User.register)

module.exports = router ;