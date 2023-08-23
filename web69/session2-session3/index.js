const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router')
const path = require('path')
const cors = require("cors")
const PORT = 3001
const dotenv = require("dotenv")
const {connectToDb} = require("./database")
const fileUpload = require("express-fileupload")

dotenv.config()
app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.use(fileUpload());

connectToDb()
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname, 'data')))

app.use(router)

app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:"+PORT)
})


