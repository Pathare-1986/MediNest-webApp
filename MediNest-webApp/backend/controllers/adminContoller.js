import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import streamifier from "streamifier";
import jwt from "jsonwebtoken"  

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      fees,
      experience,
      about,
      address,
    } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !fees || !experience || !about || !address || !imageFile) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload to Cloudinary using buffer
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(imageFile.buffer);

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      image: result.secure_url, // Cloudinary URL
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req,res) =>{
  try {
    const {email,password} = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){

      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})

    }else{
      res.json({success:false,message:"invalid credentials"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { addDoctor ,loginAdmin};
