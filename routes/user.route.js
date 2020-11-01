
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const controller = require("../controllers/user.controller")
router.get('/', controller.index ),



module.exports = router;