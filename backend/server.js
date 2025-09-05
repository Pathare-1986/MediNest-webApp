import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const allowedOrigins = [
    "https://medi-nest-web-app-git-main-pathare-1986s-projects.vercel.app",
    // add patient site when deployed, e.g. "https://your-frontend.vercel.app"
];
  

//middlewares
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); 
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','aToken',"token","dtoken"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api endpoint
app.use("/api/admin",adminRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("everything working well");
})

app.listen(port,()=>{
    console.log(`app is listening on ${port}`)
})