const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes Import
const adminRoutes = require('./routes/admin/admin');


const app = express();

//BodyParser
app.use(bodyParser.json())

//CROS Error Resolve
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Routes
app.use("/admin", adminRoutes);

//Error Middleware

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


mongoose.connect('mongodb://localhost:27017/blogsEnclave')
    .then(() => {
        app.listen(8080)
    })
    .catch(
        (err) => {
            console.log(err)
        }
    )