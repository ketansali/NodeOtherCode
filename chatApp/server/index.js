import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "../server/routes/posts.js"

const app = express()

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())


app.use('/posts', postRoutes)


const CONNECTION_URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('server running on port 5000')))
.catch((err) => console.log(err.message))
