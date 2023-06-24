require('dotenv').config()


const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())





const PORT = process.env.PORT

const homeRoute = require('./routers/home.route')

app.use(homeRoute);


app.listen(PORT , ()=>{
    console.log(PORT);
})
 