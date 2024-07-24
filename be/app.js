require('dotenv').config()
const express = require('express')
const app = express()
const connectDb = require('./config/connectDb')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const corsOption = require('./config/corsOption' )

//middleware
const asyncHandler = require('express-async-handler')
const cors = require('cors')
app.use(express.json())
app.use(cors(corsOption))


//routes
app.get('/', (req, res) =>
    {
        return res.status(200).send("welcome to Book store")
    })

app.use('/auth', authRoutes)  
app.use('/user', userRoutes)  
app.use('/task', taskRoutes)

const start = asyncHandler(async(req, res) =>
    {
        await connectDb(process.env.MONGO_URI)
        console.log("Database is connected");
        app.listen(process.env.PORT, console.log(`Server is connected to port ${process.env.PORT}`))
    })

start()