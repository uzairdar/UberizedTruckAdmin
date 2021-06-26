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
import { DeleteUser, UpdateUser } from "../Services/AdminService";
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
const MessageList = ({
  user,
  isSelect,
  collect,
  check,
  setCheck,
  room,
  clients,
  drivers,
  index,
}) => {
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
            src={drivers[index]?.image ? drivers[index].image : truck}
            className="list-thumbnail responsive border-0 card-img-left"
          />
        </NavLink>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={`?p=${user?._id}`} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                D-Name: {drivers[index]?.firstname}-{drivers[index]?.lastname}
              </p>
            </NavLink>
            <p className="mb-1  text-small w-15 w-sm-100">
              D-Email: {drivers[index]?.email}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              D-Mobile: {drivers[index]?.mobile}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              C-Name: {clients[index]?.firstname} - {clients[index]?.lastname}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              C-Email:{clients[index]?.email}
            </p>
            <p className="mb-1 ">C-Mobile: {clients[index]?.mobile}</p>
          </div>
          <div className="custom-control  pl-1 align-self-center pr-2">
            <Button
              size="xs"
              style={{ width: "100%" }}
              onClick={() => setModalRight(true)}
              color="primary"
            >
              View
            </Button>
          </div>

          <Modal
            isOpen={modalRight}
            toggle={() => setModalRight(!modalRight)}
            wrapClassName="modal-right"
          >
            <ModalHeader>Messages</ModalHeader>
            <ModalBody>
              <Row className="mt-4">
                <Col xxs="12">
                  <Card className="mb-4">
                    <CardBody>
                      {/* <CardTitle></CardTitle> */}
                      <div
                        style={{
                          height: "400px",
                          display: "flex",
                          flexDirection: "column",
                          overflowY: "auto",
                        }}
                      >
                        {room?.messages.map((single) => (
                          <div
                            style={
                              clients[index]?._id === single?.recieverId
                                ? {
                                    display: "flex",
                                    color: "purple",
                                    flexDirection: "column",
                                    alignSelf: "flex-start",
                                  }
                                : {
                                    display: "flex",
                                    color: "green",
                                    flexDirection: "column",

                                    alignSelf: "flex-end",
                                  }
                            }
                          >
                            {clients[index]?._id === single?.recieverId ? (
                              <b>
                                {clients[index]?.firstname}-
                                {clients[index]?.lastname}
                              </b>
                            ) : (
                              <b>
                                {drivers[index]?.firstname}-
                                {drivers[index]?.lastname}
                              </b>
                            )}
                            {single?.text}
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary">Proceed</Button>{" "} */}
              <Button color="secondary" onClick={() => setModalRight(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Card>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
// export default React.memo(ThumbListView);

export default MessageList;
