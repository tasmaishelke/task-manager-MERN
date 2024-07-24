const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')


router.post('/signup', asyncHandler(async(req, res) =>
    {
        const { username, password, email} = req.body
        if(!username || !password || !email)
            {
                return res.status(400).json({ Message : "All fields are required"})
            }

        const duplicateEmail = await User.findOne({ email })
        if(duplicateEmail)
            {
                return res.status(409).json({ Message : "This email is not available" })
            }
        
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        
        const userObject = { username, "password" : hashedPassword, email }

        const user = await User.create(userObject)
        if(user)
            {
                res.status(201).json({ Message : `New user with email ${email} created`})
            }
        else
            {
                res.status(400).json({ Message : "Invalid user data"})
            }
    }))

router.post('/signin', asyncHandler(async(req, res) =>
    {
        const { email, password } = req.body
        if(!email || !password)
            {
                return res.status(400).json({ Message : "Please Provide details"})
            }

        const user = await User.findOne({ email })
        if(!user)
            {
                return res.status(401).json({ Message : "Invalid credentials"})
            }
        
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
            {
                return res.status(401).json({ message: "Invalid credentials" })
            }
        const accessToken = jwt.sign(
            {
                "uid" : user._id.toString()
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : process.env.ACCESS_TOKEN_LIFETIME} 
        )
        const refreshToken = jwt.sign(
            {
                "uid" : user._id.toString()
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : process.env.REFRESH_TOKEN_LIFETIME}
        )
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })

        res.status(200).json({accessToken})
    }))

router.get('/signin/refresh', asyncHandler(async(req, res) =>
    {
        const cookies = req.cookies
        if(!cookies)
            {
                return res.status(401).json({ message: 'Unauthorized' })
            }
        console.log(cookies);
        const refreshToken = cookies.jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            asyncHandler(async(err, decoded) =>
                {
                    if(err) 
                        {
                            return res.status(403).json({ message: 'Forbidden' })
                        }
                    const user = await User.findOne({ email : decoded.email })
                    if(!user)
                        {
                            return res.status(401).json({ message: 'Unauthorized' })
                        }
                    const accessToken = jwt.sign(
                        {                        
                            "uid" : user._id.toString()                 
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
                    )        
                    res.json({ accessToken })
                }))
    }))

module.exports = router