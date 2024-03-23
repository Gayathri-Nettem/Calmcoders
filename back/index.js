import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 5000;

import { register,login,journal } from './db.js';

app.use(cors());
app.use(express.json());
//const xurl=`mongodb+srv://newuser:disha123@cluster0.hmsitr6.mongodb.net/`;
const xurl=`mongodb+srv://newuser:disha123@cluster0.hmsitr6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
try{
    mongoose.connect(xurl, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 });
    console.log("database connected!")
}

catch(error){
    console.log("error");
}
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});


app.post('/signup',register);
app.post('/login',login);
app.post('/journal',journal);
app.get('/',()=>{
    console.log("hello");
})
