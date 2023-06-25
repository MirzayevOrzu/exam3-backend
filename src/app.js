require('dotenv').config()
const usersRoute = require('./routers/users.route');
const categoryRoute = require('./routers/category.route');
const laptopsRoute = require('./routers/laptop.route');


const express = require('express');
const cors = require('cors');
const app = express();
const fileupload = require("express-fileupload");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(process.cwd() + "/uploads/"))
app.use(fileupload())







const PORT = process.env.PORT


app.use(usersRoute)
app.use(categoryRoute)
app.use(laptopsRoute)

app.listen(PORT , ()=>{
    console.log(PORT);
})
 