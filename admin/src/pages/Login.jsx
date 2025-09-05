import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios"
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const {setAToken,backendUrl} = useContext(AdminContext)
  const {setDToken}=useContext(DoctorContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
        if (state === "Admin") {
            
            const {data} = await axios.post(backendUrl+"/api/admin/login",{email,password})
            if(data.success){
                localStorage.setItem("aToken",data.token)
                setAToken(data.token)
            }else{
                toast.error(data.message)
            }

        }else{
          const {data} = await axios.post(backendUrl+"/api/doctor/login",{email,password})
            if(data.success){
                localStorage.setItem("dToken",data.token)
                setDToken(data.token)
                
            }else{
                toast.error(data.message)
            }
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span>Login</p>
        <div className="w-full">
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required/>
        </div>
        <div className="w-full">
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required/>
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
        {
            state === "Admin"
            ? <p>Doctor Login? <span className="text-primary underline cursor-pointer" onClick={()=>setState("Doctor")}>Click here</span></p>
            : <p>Admin Login? <span className="text-primary underline cursor-pointer" onClick={()=>setState("Admin")}>Click here</span></p>
        }
        {state === "Admin" && (
          <div className="w-full mt-1 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-xs text-gray-600">
            <span className="font-medium mr-1">Admin credentials:</span>
            <span className="font-mono bg-white/70 px-1 py-0.5 rounded border border-[#E5E7EB] mr-1">admin@medinest.com</span>
            <span className="font-mono bg-white/70 px-1 py-0.5 rounded border border-[#E5E7EB]">admin123</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
