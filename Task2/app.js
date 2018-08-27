const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dburl = "mongodb://localhost:27017/db_Todo";

const bodyParser = require('body-parser');

//Body parser to get post data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//End of body parser

//Connection
mongoose.connect(dburl);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
//Connection end

var tasks = require('./routes/task');
app.use('/api', tasks);

module.exports = app;