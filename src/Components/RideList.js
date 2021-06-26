import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CustomInput,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Input,
  InputGroup,
  Col,
  InputGroupAddon,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import truck from "../Assets/logo.jpg";
import Select from "react-select";

import { Formik } from "formik";
import * as yup from "yup";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { StepLabel, Step, Stepper } from "@material-ui/core";
import { deleteRide, DeleteUser, UpdateUser } from "../Services/AdminService";
const accountSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email should have a proper format"),
  lastname: yup.string(),
  // .required("Last name is required"),
  address: yup.string(),
  // .required("Address is required"),
  country: yup.string(),
  // .required("Country is required"),
  phone: yup.string(),
  // .required("Phone is required"),
});
const RideList = ({ user, isSelect, rides, setCheck, check }) => {
  const [modalRight, setModalRight] = useState(false);

  //   const [selectedCategory, setSelectedCategory] = useState(user.position);
  //   const [selectedVerification, setSelectedVerification] = useState(
  // user.isVerified ? "verified" : "not verified"
  //   );

  useEffect(() => {
    console.log("user");
  }, []);

  const onProceed = () => {};
  return (
    <Col
      xxs="12"
      key={user?._id}
      className="mb-3"
      // style={{ borderBottom: "1px solid silver" }}
    >
      {/* {console.log('order'), user} */}
      <Card
        // onClick={(event) => onCheckItem(event, user._id)}
        className={classnames("d-flex flex-row", {
          active: isSelect,
        })}
      >
        <NavLink to={`?p=${user?._id}`} className="d-flex">
          <img
            style={{ width: "90px", minWidth: "90px", maxWidth: "90px" }}
            // alt={}
            src={rides?.driver?.image ? rides?.driver?.image : truck}
            className="list-thumbnail responsive border-0 card-img-left"
          />
        </NavLink>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={`?p=${user?._id}`} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                <b>D-Name:</b> {rides?.driver?.firstname}-
                {rides?.driver?.lastname}
              </p>
            </NavLink>
            <p className="mb-1  text-small w-15 w-sm-100">
              <b>C-Name:</b> {rides?.client?.firstname}-
              {rides?.client?.lastname}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              <b>Amount:</b> {rides?.amount}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              <b>Pickup Point:</b> lat:{rides?.pickup?.latitude} - long:
              {rides?.pickup?.longitude}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              <b>Destination:</b> lat:{rides?.destination?.latitude}-long:
              {rides?.destination?.longitude}
            </p>
            <p className="mb-1 ">
              <b>Status:</b> {rides?.status}
            </p>
          </div>
          <div className="custom-control  pl-1 align-self-center pr-2">
            <Button
              size="xs"
              style={{ width: "100%" }}
              onClick={() =>
                deleteRide(rides?._id)
                  .then((response) => {
                    console.log("deleted", response);
                    window.alert("deleted");
                    setCheck(!check);
                  })
                  .catch((error) => {
                    console.log("error", error);
                  })
              }
              color="primary"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
// export default React.memo(ThumbListView);

export default RideList;
