import express from "express"
import upload from "../middlewares/multer.js";
import { addDoctor, loginAdmin } from "../controllers/admincontoller.js";
import authAdmin from "../middlewares/AuthAdmin.js";

const adminRouter = express.Router()

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor)
adminRouter.post("/login",loginAdmin)

export default adminRouter;