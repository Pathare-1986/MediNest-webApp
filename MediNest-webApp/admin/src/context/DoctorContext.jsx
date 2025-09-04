import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const [appointments,setAppointments] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const getAppointments = async ()=>{
    try {
      
      const {data} = await axios.get(backendUrl+"/api/doctor/appointments",{headers:{dToken}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments.reverse())
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const value = {
    backendUrl,
    dToken,setDToken,
    getAppointments,
    setAppointments,appointments
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
