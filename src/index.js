const path = require('path');
const express = require('express');
const route = require('./routes');
const cors = require('cors');
const db = require('./configs/mongodb');
const {ValidationError} = require('express-validation');
const {logger} = require("./configs/logger");
require('dotenv').config();


// Connect to DB
db.connect();

const app = express();
const port = process.env.APP_PORT || 3001;

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Set cors
app.use(cors());

// Routes init
route(app);

// if error validation
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return next(err);
});

app.listen(port, () => {
    var timeStart = new Date();
    console.log(`${timeStart} - App listening at http://localhost:${port}`);
});
