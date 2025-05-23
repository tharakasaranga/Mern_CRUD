const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const postRoutes = require('./routes/posts');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());  // CORS should be first
app.use(bodyParser.json());
app.use(postRoutes);

const port = 5000;
const DB_URL = 'mongodb://localhost:27017/mernTutorial';

//import Routes



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));



  

mongoose.connect(DB_URL).then(()=>{
    console.log("DB Connected");
}).catch((err) => {
    console.log("DB Connection Error", err);
})


app.listen(port, () => {
    console.log(`App is running on ${port}`);
})