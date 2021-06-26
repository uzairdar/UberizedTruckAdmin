import React, { useEffect, useState } from "react";
import ThumbListView from "../Components/ThumbListView";
import { getUser } from "../Services/AdminService";
import { useHistory, useLocation } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [check, setCheck] = useState(true);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log("location", location);
    if (!location?.state?.data) {
      // history.push("/admin-login");
    }
    getUser()
      .then((response) => {
        console.log("response", response);
        setUsers(response?.data?.users);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [check]);
  return (
    <div className="mt-4" style={{ backgroundColor: "#f8f8f8" }}>
      {users.map((user) => (
        <ThumbListView user={user} setCheck={setCheck} check={check} />
      ))}
    </div>
  );
}

export default AdminUsers;
