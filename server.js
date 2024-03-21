const express = require("express");
const router = require("./routes");
const { connectToDB } = require("./middlewares/dbConnection");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/' , router);

connectToDB()
    .then(()=>{
        const port = process.env.PORT || 5000;
        app.listen(port , ()=>{
            console.log(`Server running on port ${port}`);
        })
    })
    .catch(err => console.log(err));
