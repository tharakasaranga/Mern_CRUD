const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const DB_URL = 'mongodb://localhost:27017/mernTutorial';

//import Routes
const postRoutes = require('./routes/posts');


//import middleware
app.use(bodyParser.json());



app.use(postRoutes);
mongoose.connect(DB_URL).then(()=>{
    console.log("DB Connected");
}).catch((err) => {
    console.log("DB Connection Error", err);
})


app.listen(port, () => {
    console.log(`App is running on ${port}`);
})