const express = require("express");
const router = express.Router();
const mongoose = require( "mongoose" );
const dotenv = require('dotenv').config();

const Task = require('../models/task');
const TaskController = require("../controllers/tasks");
const checkAuth = require("../middleware/checkAuth");

router.get('/', checkAuth, TaskController.Get_All_Tasks);

router.post('/', checkAuth, (req,res, next)=>{
    if(req.body.priority === "" && (req.body.priority != "low" || req.body.priority != "medium" || req.body.priority != "high")){
        return res.status(500).json({
            message: "Invalid task priority!",
            priorityOptions: "low, medium, high"
        })
    }else if(req.body.status === "" && (req.body.status != "done" || req.body.status != "in progress" || req.body.status != "pending")){
        return res.status(500).json({
            message: "Invalid task status",
            statusOptions: "pending, in progress, done"
        })
    }else{
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        active: true
    });
    task.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Task created successfully",
            CreatedProduct:{
                _id: result._id,
                name: result.name,
                description: result.description,
                status: result.status,
                priority: result.priority,
                request:{
                    type: "GET",
                    Url:`localhost:3000/task/${result._id}`
                }
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    })}
});

router.delete('/:TaskId', checkAuth, (req, res, next)=>{
    const ID = req.params.TaskId;
    Task.find({_id: ID})
    .exec()
    .then(task=>{
        if(task.active == true){
            return res.status(200).json({
                message: "Task moved to trash!"
            });
        }else if(task.active == false){
            Task.findByIdAndDelete({_id: req.params.TaskId})
            return res.status(200).json({
                message: "Task deleted successfully!",
                request:{
                    type: "POST",
                    url: `localhost:3000/tasks/${req.params.TaskId}`
                },
                taskId: TaskId
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    })

})

router.delete("/trash/:TaskId", checkAuth, (req, res, next)=>{
    const id = req.params.TaskId;
    Product.findByIdAndDelete(id)
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Deleted task',
            request:{
                type:'POST',
                url:`http://localhost:3000/tasks`,
                body: {name: 'String'}
            }
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.get("/trash", checkAuth, (req, res, next)=>{
    Task.find()
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                if(doc.active == false){
                return {
                    TaskId: doc._id,
                    name: doc.name,
                    description: doc.description,
                    status: doc.status,
                    priority: doc.priority,
                    active:doc.active,
                    request:{
                        type: "GET",
                        Url:`localhost:3000/task/${doc._id}`
                    }
                }}
            })
        }
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:TaskId', checkAuth, (req, res, next)=>{
    console.log(req.params.TaskId)
    Task.find({_id:req.params.TaskId})
    .exec()
    .then(doc=>{
        const response = {
            TaskId: doc._id,
            name: doc.name,
            description: doc.description,
            status: doc.status,
            priority: doc.priority,
            active:doc.active,
            request:{
                type: "GET",
                Url:`localhost:3000/task/${doc._id}`
            }
        }
        return res.status(200).json({
            Task: response
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;