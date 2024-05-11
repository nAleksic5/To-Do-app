const express = require("express");
const router = express.Router();
const mongoose = require( "mongoose" );
const dotenv = require('dotenv').config();

const Task = require('../models/task');
const TaskController = require("../controllers/tasks");
const checkAuth = require("../middleware/checkAuth");

router.get('/', checkAuth, TaskController.Get_All_Tasks);

router.post('/', checkAuth, TaskController.Add_Task);

router.delete('/:TaskId', checkAuth, TaskController.Temp_Delete_Task);

router.delete("/trash/:TaskId", checkAuth, TaskController.Perm_Delete_Task);

router.get("/trash", checkAuth, TaskController.Get_All_Deleted_Tasks);

router.get("/trash/:TaskId", checkAuth, TaskController.Get_Deleted_Task);

router.get('/:TaskId', checkAuth, TaskController.Get_One_Task);

module.exports = router;