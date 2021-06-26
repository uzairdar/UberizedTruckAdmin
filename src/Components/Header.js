import React, { useState, useEffect } from "react";
import {
  Row,
  Column,
  Collapse,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import ust from "../Assets/ust.png";
import { useHistory, useLocation } from "react-router-dom";

function Header() {
  const [mobileView, setMobileView] = useState(false);
  const [check, setCheck] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (window.innerWidth < 700) {
      setMobileView(true);
    }
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.body.classList.remove("no-footer");
    };
  }, []);

  const onWindowResize = (event) => {
    if (event.target.innerWidth >= 700) {
      setMobileView(false);
    } else {
      setMobileView(true);
    }
  };
  return (
    <div>
      {!mobileView ? (
        <div
          className="pl-5 pr-5"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            color: "white",
            backgroundColor: "#9966ff",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          <img src={ust} style={{ width: "100px", height: "90%" }} />
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/admin-users")}
          >
            Users
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("rides")}
          >
            Rides
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("messages")}
          >
            Messages
          </p>

          <p
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/admin-login")}
          >
            Logout
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              width: "100%",
              // border: "1px solid black",
              display: "flex",
              backgroundColor: "#ccb3ff",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={ust}
              onClick={() => setCheck(!check)}
              style={{ width: "100px", height: "90%" }}
            />
          </div>
          {check && (
            <div
              className="pl-5 pr-5"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "space-between",
                width: "100%",
                color: "white",
                backgroundColor: "#9966ff",
                justifyContent: "center",
                // height: "80px",
              }}
            >
              <p
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/admin-users")}
              >
                Users
              </p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => history.push("rides")}
              >
                Rides
              </p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => history.push("messages")}
              >
                Messages
              </p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/admin-login")}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
