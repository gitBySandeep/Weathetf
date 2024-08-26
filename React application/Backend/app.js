import express from "express"
import bodyParser from "body-parser";
import cors from 'cors'
import userRouter from './Router/user.Route.js';                   
import weatherRouter from './Router/weather.Route.js'

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/user",userRouter);
app.use("/weatherforecast",weatherRouter);

app.listen(3005,()=>{
    console.log("Server started");
})