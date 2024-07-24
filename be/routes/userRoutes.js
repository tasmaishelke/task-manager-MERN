const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')




router.get('/', asyncHandler(async(req, res) =>
    {
        const user = await User.find()
        if(user.length === 0)
            {
                return res.status(400).json({ Message : "No users found"})
            }
        res.json(user)
    }))

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

router.get('/details', asyncHandler(async(req, res) =>
    {
        const uid = req.uid
        const user = await User.findById(uid)
        if(!user)
            {
                return res.status(400).json({ Message : "No users found"})
            }
        res.json(user)
    }))

router.patch('/details', asyncHandler(async(req, res) =>
    {
        const { username, password, email } = req.body
        const uid = req.uid
        if(!email)
            {
                return res.status(400).json({ Message : "Id, email is required"})
            }
        
        const user = await User.findById(uid)
        if(!user)
            {
                return res.status(400).json({ Message : "User not found"})
            }
        
        const duplicateEmail = await User.findOne({email})
        if(duplicateEmail && duplicateEmail._id.toString() !== uid)
            {
                return res.status(409).json({ Message : "Duplicate Email"})
            }

        if(username)
            {
                user.username = username        
            }
        
        if(email)
            {
                user.email = email    
            }

        if(password)
            {
                user.password = await bcrypt.hash(password, 10)        
            }

        const updatedUser = await user.save()
        console.log(updatedUser);
        res.status(200).json({ Message : `${updatedUser.username} updated`})
    }))

router.delete('/details', asyncHandler(async(req, res) =>
    {
        const uid = req.uid    
        const user = await User.findById(uid)
        if(!user)
            {
                return res.status(400).json({ message: 'User not found' })
            }
        await user.deleteOne()
        res.status(200).json({ message: `${user.email} deleted` })
    
    }))




module.exports = router