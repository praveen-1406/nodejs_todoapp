import express from "express";
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors';


export const app = express();


config({
    path:"./data/.env"
})


//Using middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, //send headers.:cookies,...
}))

app.use("/api/v1/users",userRouter);
app.use('/api/v1/tasks',taskRouter);



app.get("/", (req, res) => {
    res.send("Nicely working")
})


app.use(errorMiddleware)

