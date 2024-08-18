const express = require("express");

const router = express();

const { signup, login, viewuser } = require("../Controller/userController")

const addTask = require("../Controller/taskController");

const middleware = require("../middleware")


router.post( "/signup", signup );
router.post( "/login", login );
router.get( "/viewuser",middleware, viewuser );
router.post( "/addtask",middleware, addTask );

module.exports = router;