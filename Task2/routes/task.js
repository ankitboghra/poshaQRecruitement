const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task_model = require('../models/task_model');

//Temporary - Get all tasks
router.get('/', function (req, res, next) {
    console.log("Called");

    Task_model.find()
        .select('label tasks')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                list: docs.map(doc => {
                    return {
                        taskName: doc.taskName,
                        label: doc.label
                    }
                })
            };
            console.log(docs);
            res.write(docs.toString());
            // res.write();
        })
});
router.post('/create_label', function (req, res) {
    Task_model.find({ label: req.body.label_name })
        .exec().then(task_model => {
            if (task_model >= 1) {
                return res.status(409)
                    .json({
                        message: "Label already exists..!"
                    })
            }
            else {
                const task_model = new Task_model({
                    label: req.body.label_name
                }).save().then(result => {
                    res.status(201).json(
                        {
                            message: "Added new label"
                        }
                    ).catch(err => {
                        console.log("Error inserting the task.");
                    })
                })
            }
        })
});

//Delete label
router.delete('/delete_label', function (req, res) {
                Task_model.remove({label:req.body.label_name})
                .exec()
                .then(result=>{
                    res.status(200).json({
                        message:"Label deleted successfully..!!"
                    });
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
});

//Update task
router.patch('/update_label/:updateLabel', function (req, res, next){
    const label=req.params.updateLabel;
    const updateLabel=req.body.label_name;
    Task_model.update({label:label}, {"label":updateLabel}).exec().then(result=>{
        res.status(200).json({
            message:"Label updated successfully :)"
        });
    }).catch(err=>{
        error:err
    });
});

//Create task
router.patch('/create_task', function (req,res, next){
    Task_model.update({label:req.body.label_name},{$push:{tasks:req.body.task}}).exec().then(result=>{
        res.status(200).json({
            message:'Task added successfully ;)'
        })
    }).catch(err=>{
        error:err
    });
});

//Delete task
router.patch('/delete_task', function (req,res, next){
    Task_model.update({label:req.body.label_name},{$pull:{tasks:req.body.task}}).exec().then(result=>{
        res.status(200).json({
            message:'Task Deleted successfully from ' + req.body.label_name + ' ;)'
        })
    }).catch(err=>{
        error:err
    });
});

//Update task
router.patch('/update_task', function (req,res, next){
    Task_model.update({label:req.body.label_name},{$pull:{tasks:req.body.old_task}}).exec().then(result=>{
        res.status(200).json({
            message:'Task Updated successfully ;)'
        })
    }).catch(err=>{
        error:err
    });
    Task_model.update({label:req.body.label_name},{$pull:{tasks:req.body.task}}).exec().then(result=>{
        res.status(200).json({
            message:'New task added successfully to ' + req.body.label_name + ' ;)'
        })
    }).catch(err=>{
        error:err
    });
});

//Move task
    router.patch('/move_task', function (req,res, next){
        Task_model.update({label:req.body.label_name},{$pull:{tasks:req.body.task}}).exec().then(result=>{
            res.status(200).json({
                message:'Task moved from '+req.body.label_name + ' to '
            })
        }).catch(err=>{
            error:err
        });
        Task_model.update({label:req.body.label_name},{$push:{tasks:req.body.task}}).exec().then(result=>{
            res.status(200).json({
                message:req.body.label_name + ' ;)'
            })
        }).catch(err=>{
            error:err
        });
    });




module.exports = router;