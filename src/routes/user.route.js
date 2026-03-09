const express = require('express');
const userController = require('../controllers/user.controller');
const authenticateMiddleware = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.get('/', authenticateMiddleware, userController.user);

module.exports = userRouter;
