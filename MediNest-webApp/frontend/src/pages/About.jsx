import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          src={assets.about_image}
          className="w-full md:max-w-[360px]"
          alt="about_image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to MediNest, your reliable partner in managing healthcare
            appointments and medical records efficiently. MediNest makes it
            simple for patients to book appointments, track their health, and
            stay connected with healthcare providers, all through one intuitive
            platform.
          </p>
          <p>
            With cutting-edge technology and a focus on user experience,
            MediNest ensures that both patients and clinics enjoy smooth,
            hassle-free healthcare management — whether it’s scheduling your
            first visit or managing ongoing treatments.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            At MediNest, our vision is to create a seamless and accessible
            healthcare experience for everyone. We aim to bridge the gap between
            patients and healthcare providers, making quality care available
            when and where it’s needed most.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p className="text-gray-400">
          WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
