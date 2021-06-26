import React, { useState, useEffect } from "react";
import MessageList from "../Components/MessageList";
import { getEachUser, getRooms } from "../Services/AdminService";

function Messages() {
  const [clients, setClients] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms()
      .then((response) => {
        console.log("response", response);
        setRooms(response?.data?.room);
        response?.data?.room?.map((single) => {
          getEachUser(single?.clientId)
            .then((res) => {
              console.log("res", res);

              setClients((oldArray) => [...oldArray, res?.data?.user]);
            })
            .catch((err) => {
              console.log("err", err);
            });
          getEachUser(single?.driverId)
            .then((res) => {
              console.log("res", res);

              setDrivers((oldArray) => [...oldArray, res?.data?.user]);
            })
            .catch((err) => {
              console.log("err", err);
            });
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  return (
    <div>
      {rooms?.map((room, index) => (
        <MessageList
          room={room}
          index={index}
          clients={clients}
          drivers={drivers}
        />
      ))}
    </div>
  );
}

export default Messages;
