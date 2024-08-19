const express = require("express");

const router = express();

const { signup, login, viewuser } = require("../Controller/userController")

const { addTask, editTask, showTask, deleteTask } = require("../Controller/taskController");

const middleware = require("../middleware")


router.post( "/signup", signup );
router.post( "/login", login );
router.get( "/viewuser",middleware, viewuser );
router.post( "/addtask",middleware, addTask );
router.put( "/edittask",middleware, editTask );
router.get("/seetask", middleware, showTask);
router.post("/deletetask", middleware, deleteTask);


module.exports = router;