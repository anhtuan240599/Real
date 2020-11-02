
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const controller = require("../controllers/user.controller")

router.get('/', controller.index )

router.get('/chat',controller.chat)

router.get('/register',controller.dangky)

router.post('/register',controller.register)

router.get('/login',controller.dangnhap)

router.post('/login',controller.login)

router.get("/room",controller.enterRoom)

module.exports = router;