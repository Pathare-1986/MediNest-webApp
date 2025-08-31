import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


//middlewares

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api endpoint
app.use("/api/admin",adminRouter);


app.get("/",(req,res)=>{
    res.send("everything working well");
})

app.listen(port,()=>{
    console.log(`app is listening on ${port}`)
})