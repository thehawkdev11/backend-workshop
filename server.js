const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

// Midddleware

app.use('/api/places',placesRouter);
app.use('/api/users',usersRouter);

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "something went wrong!!!!"})
})

mongoose.connect('mongodb+srv://mak:7INRA0L2FEb1jZql@cluster0.jwgayja.mongodb.net/?retryWrites=true&w=majority')
        .then(()=>{
            console.log("Connected to DB!");
            app.listen(5000);
        })
        .catch(err=>{
            console.log(err);
        });


        

