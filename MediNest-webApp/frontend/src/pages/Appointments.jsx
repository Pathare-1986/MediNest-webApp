import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Appointments = () => {
  const [docInfo, setDocInfo] = useState(null);
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id == docId);
    setDocInfo(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
  <div>
    {/* -------Doctor Deatils------ */}
    <div>
      <div>

      </div>
    </div>
  </div>
  );
};

export default Appointments;
