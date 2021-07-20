const express = require ('express');
const dotenv = require ('dotenv');
const helmet = require ('helmet');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const userRoute = require('./router/users.js');
const authRoute = require('./router/auth.js');
const app = express();
const url = "mongodb://127.0.0.1:27017/socialmedia";

dotenv.config();

mongoose.connect(url,{useNewUrlParser:true},()=>{
    console.log("db connected!");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common")); 

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);

app.get('/',(req,res)=>{
    res.send('welcome');
})

app.get('/users',(req,res)=>{
    res.send('welcome usrs');
})

app.listen(3000,()=>{
    console.log("server is running..");
})