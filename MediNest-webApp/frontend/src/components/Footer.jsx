import React from "react";
import { assets } from "../assets/assets";

const footer = () => {
  return (
    <div className="md:mx-10">
        <hr/>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        {/* ------Left side----- */}
        <div>
          <img className="w-40" style={{width:"13rem"}} src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We are dedicated to providing quality healthcare services with
            trusted doctors and modern facilities. Your health and well-being
            are our top priority.
          </p>
        </div>

        {/* ------Midile side----- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2  text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------Right side----- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2  text-gray-600">
            <li>+1-212-456-7890</li>
            <li>medinest.dev@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright © 2025 MediNest – All Rights Reserved.</p>
      </div>

    </div>
  );
};

export default footer;
