const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const Task = require('../model/taskModel')

router.use((req, res, next) => 
    {
        const authHeader = req.headers.authorization || req.headers.Authorization
        if (!authHeader?.startsWith('Bearer ')) 
            {
                return res.status(401).json({ message: 'Unauthorized' })
            }
    
        const token = authHeader.split(' ')[1]
    
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => 
                {
                    if (err)
                        {
                            return res.status(403).json({ message: 'Forbidden from verify jwt' })
                        }
                    req.uid = decoded.uid

                    next()
                })
    })

router.get('/', asyncHandler(async(req, res) =>
    {
        const uid = req.uid
        const getAllTasks = await Task.find({ createdBy : uid })
        if(getAllTasks.length === 0)
            {   
                return res.status(400).json({ Message : "No Task found"})
            }
        res.status(200).json({count : getAllTasks.length, tasks : getAllTasks})

    }))

router.post('/', asyncHandler(async(req, res) =>
    {
        const { title, note } = req.body
        const uid = req.uid
        if(!title || !note )
            {
                return res.status(400).json({ Message : "title, note, uid are required"})
            }
        const taskObject = { title, note, createdBy : uid }
        const createTask = await Task.create(taskObject)
        res.status(201).json({ createTask })

    }))

router.get('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const  uid  = req.uid
        const getTask = await Task.findOne({_id : id , createdBy : uid})
        if(!getTask)
            {   
                return res.status(400).json({ Message : "No Tasks found with that id"})
            }
        res.status(200).json(getTask)

    }))

router.patch('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const { title, note } = req.body
        const  uid  = req.uid
        if(!title || !note)
            {
                return res.status(400).json({ Message : "title, note, uid are required"})
            }
        const getTask = await Task.findOne({_id : id, createdBy : uid})
        if(!getTask)
            {   
                return res.status(400).json({ Message : "No Tasks found with that id"})
            }
        const taskObject = { title, note }
        await Task.findByIdAndUpdate(id, taskObject)
        res.status(201).json({ Message : "The Task is updated"})
    }))

router.delete('/:id', asyncHandler(async(req, res) =>
    {
        const { id } = req.params
        const  uid  = req.uid
        const deleteTask = await Task.findOneAndDelete({_id : id, createdBy : uid})
        if(!deleteTask)
            {   
                return res.status(400).json({ Message : "No Task found with that id to delete"})
            }
        res.status(201).json({ Message : "The Task deleted"})
    }))

module.exports = router