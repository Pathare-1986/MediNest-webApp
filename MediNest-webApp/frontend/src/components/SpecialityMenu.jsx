import React from 'react'
import {specialityData} from "../assets/assets"
import {Link} from "react-router-dom"

const speciality = () => {
  return (
    <div className='#speciality'>
      <h1>Find by Speciality</h1>
      <p>Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.</p>
      <div>
        {specialityData.map((item,index)=>{
          <Link  key={index} to={`/doctors/${item.speciality}`}>
            <img src={item.image} alt="itemImage" />
            <p>{item.speciality}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default speciality