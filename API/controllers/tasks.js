const mongoose = require("mongoose");
const Task = require("../models/task");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

exports.Get_All_Tasks = (req, res, next) => {
    Task.find()
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                if(doc.active == true){
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
}

exports.Add_Task = (req, res, next) => {
    
}