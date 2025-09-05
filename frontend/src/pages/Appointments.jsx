import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const [docInfo, setDocInfo] = useState(null);
  const [doctSlots, setDoctSlots] = useState([]);
  const [slotIndex, seSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } =
    useContext(AppContext);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id == docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
  if (!docInfo || !docInfo.slots_booked) {
    console.warn("Doctor info or slots_booked is missing.");
    return;
  }

  setDoctSlots([]);

  let today = new Date();
  let allSlots = [];
  let startDayIndex = 0;

  // Check if today is too late for appointments (after 8 PM)
  const currentHour = today.getHours();
  if (currentHour >= 20) {
    startDayIndex = 1; // Start from tomorrow
  }

  for (let i = startDayIndex; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let endTime = new Date(today);
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    // Set start time for the day
    let startTime = new Date(today);
    startTime.setDate(today.getDate() + i);
    
    if (i === 0) {
      // For today, start from current time + 1 hour or 10 AM, whichever is later
      const now = new Date();
      const currentHour = now.getHours();
      
      if (currentHour >= 10 && currentHour < 20) {
        // If it's between 10 AM and 8 PM, start from current hour + 1
        startTime.setHours(currentHour + 1);
        startTime.setMinutes(0);
      } else {
        // If it's before 10 AM, start from 10 AM
        startTime.setHours(10);
        startTime.setMinutes(0);
      }
    } else {
      // For future days, start from 10 AM
      startTime.setHours(10);
      startTime.setMinutes(0);
    }

    let timeSlots = [];
    let slotTime = new Date(startTime);

    while (slotTime < endTime) {
      let formattedTime = slotTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let day = slotTime.getDate();
      let month = slotTime.getMonth() + 1;
      let year = slotTime.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const isSlotAvailable =
        docInfo.slots_booked[slotDate] &&
        docInfo.slots_booked[slotDate].includes(formattedTime)
          ? false
          : true;

      if (isSlotAvailable) {
        timeSlots.push({
          dataTime: new Date(slotTime),
          time: formattedTime,
        });
      }

      slotTime.setMinutes(slotTime.getMinutes() + 30);
    }

    allSlots.push(timeSlots);
  }

  setDoctSlots(allSlots);

  // Find first available slot day
  const firstAvailableIndex = allSlots.findIndex(daySlots => daySlots.length > 0);

  if (firstAvailableIndex !== -1) {
    setSlotIndex(firstAvailableIndex);
    setSlotTime("");
    console.log("First available slot day index:", firstAvailableIndex);
  } else {
    setSlotIndex(0);
    setSlotTime("");
    console.log("No available slots in the next 7 days.");
  }

  console.log("Slots updated:", allSlots);
};


  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    // Check if slots exist for the selected day
    if (!doctSlots[slotIndex] || doctSlots[slotIndex].length === 0) {
      toast.error("No available slots for this day. Please select another day.");
      return;
    }

    // Check if user selected a time
    if (!slotTime) {
      toast.error("Please select a time slot before booking.");
      return;
    }

    try {
      // Find the selected time slot from the available slots
      const selectedSlot = doctSlots[slotIndex].find(slot => slot.time === slotTime);
      
      if (!selectedSlot) {
        toast.error("Selected time slot is no longer available.");
        return;
      }

      const date = selectedSlot.dataTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(doctSlots);
  }, [doctSlots]);

  return (
    docInfo && (
      <div>
        {/* -------Doctor Deatils------ */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt="doctorImage"
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ------------- Doc Info : name , degree , experience  --------- */}

            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="verified_icon"
              />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* -------Doctor About------- */}

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ---------- Booking Slots  ---------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctSlots.length &&
              doctSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => seSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200 "
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].dataTime.getDay()]}</p>
                  <p>{item[0] && item[0].dataTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctSlots.length &&
              doctSlots[slotIndex]?.length > 0 &&
              doctSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        {/* ------- Listing Related Doctors ----- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
