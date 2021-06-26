import React, { useState, useEffect } from "react";
import RideList from "../Components/RideList";
import { getRides } from "../Services/AdminService";

function Rides() {
  const [rides, setRides] = useState([]);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    getRides()
      .then((response) => {
        console.log("rides", response);
        setRides(response?.data?.rides);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, [check]);
  return (
    <div>
      {rides.map((single) => (
        <RideList rides={single} setCheck={setCheck} check={check} />
      ))}
    </div>
  );
}

export default Rides;
