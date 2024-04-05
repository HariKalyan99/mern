import express from 'express';
import {PORT, mongoDB_URI} from './config.js'
import mongoose from 'mongoose';
// import { Book } from './models/bookmodel.js';
import bookRouter from './routes/books.routes.js';
import cors from 'cors';


const app = express();
app.use(express.json());
//middleware for handling cors
//default for * all
// app.use(cors()) 

//if we want to allow custom origins

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
})) 

app.get("/", (request, response) => {
    return response.send("Mern Book server")
})

app.use("/books", bookRouter)



mongoose.connect(mongoDB_URI).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
    
}).catch((error) => {
    console.log("Database is not connected", error)
})


