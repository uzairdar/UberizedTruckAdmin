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
const ThumbListView = ({ user, isSelect, collect, check, setCheck }) => {
  const [modalRight, setModalRight] = useState(false);

  var count = 0;
  const options = [
    { value: "client", label: "Client" },
    { value: "driver", label: "Driver" },
  ];
  const options2 = [
    { value: "verified", label: "Verified" },
    { value: "not verified", label: "Not Verified" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(user.position);
  const [selectedVerification, setSelectedVerification] = useState(
    user.isVerified ? "verified" : "not verified"
  );

  useEffect(() => {
    console.log("user");
  }, []);

  const onProceed = () => {};
  return (
    <Col
      xxs="12"
      key={user._id}
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
        <NavLink to={`?p=${user._id}`} className="d-flex">
          <img
            style={{ width: "90px", minWidth: "90px", maxWidth: "90px" }}
            alt={user && user.gig && user.gig.title}
            src={user?.image ? user.image : truck}
            className="list-thumbnail responsive border-0 card-img-left"
          />
        </NavLink>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={`?p=${user._id}`} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {user?.firstname}-{user?.lastname}
              </p>
            </NavLink>
            <p className="mb-1  text-small w-15 w-sm-100">{user?.email}</p>
            <p className="mb-1 x text-small w-15 w-sm-100">{user?.mobile}</p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              {user?.address ? user.address : "no address"}
            </p>
            <p className="mb-1 x text-small w-15 w-sm-100">
              {user?.country ? user.country : "no country"}
            </p>
            <p className="mb-1 ">{user?.position}</p>
            <p className="mb-1 ">
              {user?.isVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
          <div className="custom-control  pl-1 align-self-center pr-2">
            <Button
              size="xs"
              style={{ width: "100%" }}
              onClick={() => setModalRight(true)}
              color="primary"
            >
              Edit
            </Button>
          </div>
          <div className="custom-control  pl-1 align-self-center pr-2">
            <Button
              size="xs"
              style={{ width: "100%" }}
              color="warning"
              onClick={() => {
                DeleteUser(user?._id).then((response) => {
                  console.log("response", response);
                  if (response?.data?.user) {
                    setCheck(!check);
                  }
                });
              }}
            >
              Delete
            </Button>
          </div>
          <Formik
            initialValues={{
              firstname: user?.firstname ? user.firstname : "",
              lastname: user?.lastname ? user.lastname : "",
              email: user?.email ? user.email : "",
              address: user?.address ? user.address : "",
              phone: user?.mobile ? user.mobile : "",
              country: user?.country ? user.country : "",
            }}
            validationSchema={accountSchema}
            onSubmit={(values, actions) => {
              console.log(
                "values",
                values,
                selectedCategory,
                selectedVerification
              );
              const data = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                address: values.address,
                mobile: values.phone,
                country: values.country,
                position: selectedCategory,
                isVerified: selectedVerification === "verified" ? true : false,
              };
              UpdateUser(user._id, data)
                .then((response) => {
                  console.log("response", response);
                  if (response.data.user) {
                    setCheck(!check);
                    setModalRight(false);
                  }
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }}
          >
            {(formikProps) => (
              <div>
                <Modal
                  isOpen={modalRight}
                  toggle={() => setModalRight(!modalRight)}
                  wrapClassName="modal-right"
                >
                  <ModalHeader>Feedback</ModalHeader>
                  <ModalBody>
                    <Row className="mt-4">
                      <Col xxs="12">
                        <Card className="mb-4">
                          <CardBody>
                            <CardTitle>
                              {/* <IntlMessages id="Rate your overall Experience" /> */}
                            </CardTitle>
                            <InputGroup className="mt-2">
                              <InputGroupAddon addonType="prepend">
                                First Name
                              </InputGroupAddon>
                              <Input
                                value={formikProps.values.firstname}
                                onChange={formikProps.handleChange("firstname")}
                                onBlur={formikProps.handleBlur("firstname")}
                                // style={styles.input}
                                placeholder="First name"
                              />
                            </InputGroup>

                            {formikProps.touched.firstname &&
                              formikProps.errors.firstname && (
                                <div className="error">
                                  {formikProps.touched.firstname &&
                                    formikProps.errors.firstname}
                                </div>
                              )}
                            <InputGroup className="mt-2">
                              <InputGroupAddon addonType="prepend">
                                Last Name
                              </InputGroupAddon>
                              <Input
                                value={formikProps.values.lastname}
                                onChange={formikProps.handleChange("lastname")}
                                onBlur={formikProps.handleBlur("lastname")}
                                placeholder="Last name"
                              />
                            </InputGroup>
                            {formikProps.touched.lastname &&
                              formikProps.errors.lastname && (
                                <div className="error">
                                  {formikProps.touched.lastname &&
                                    formikProps.errors.lastname}
                                </div>
                              )}
                            <InputGroup className="mt-2">
                              <InputGroupAddon addonType="prepend">
                                Email
                              </InputGroupAddon>
                              <Input
                                value={formikProps.values.email}
                                onChange={formikProps.handleChange("email")}
                                onBlur={formikProps.handleBlur("email")}
                                placeholder="Last name"
                              />
                            </InputGroup>
                            {formikProps.touched.email &&
                              formikProps.errors.email && (
                                <div className="error">
                                  {formikProps.touched.email &&
                                    formikProps.errors.email}
                                </div>
                              )}
                            <InputGroup className="mt-2">
                              <InputGroupAddon addonType="prepend">
                                Address
                              </InputGroupAddon>
                              <Input
                                // style={styles.input}
                                placeholder="Home address"
                                value={formikProps.values.address}
                                onChange={formikProps.handleChange("address")}
                                onBlur={formikProps.handleBlur("address")}
                              />
                            </InputGroup>
                            {formikProps.touched.address &&
                              formikProps.errors.address && (
                                <p>
                                  {formikProps.touched.address &&
                                    formikProps.errors.address}
                                </p>
                              )}
                            <InputGroup className="mt-2">
                              <InputGroupAddon addonType="prepend">
                                Country
                              </InputGroupAddon>{" "}
                              <Input
                                placeholder="Country"
                                value={formikProps.values.country}
                                onChange={formikProps.handleChange("country")}
                                onBlur={formikProps.handleBlur("country")}
                              />
                            </InputGroup>
                            {formikProps.touched.country &&
                              formikProps.errors.country && (
                                <p className="error">
                                  {formikProps.touched.country &&
                                    formikProps.errors.country}
                                </p>
                              )}
                            <InputGroup className="mt-2">
                              <InputGroupAddon addonType="prepend">
                                Mobile
                              </InputGroupAddon>
                              <Input
                                value={formikProps.values.phone}
                                onChange={formikProps.handleChange("phone")}
                                onBlur={formikProps.handleBlur("phone")}
                                placeholder="Phone No"
                              />
                            </InputGroup>
                            {formikProps.touched.phone &&
                              formikProps.errors.phone && (
                                <p className="error">
                                  {formikProps.touched.phone &&
                                    formikProps.errors.phone}
                                </p>
                              )}
                            <p style={{ marginBottom: "0px" }} className="mt-2">
                              Position
                            </p>
                            <Select
                              value={selectedCategory}
                              placeholder={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.value)}
                              options={options}
                            />
                            <p style={{ marginBottom: "0px" }} className="mt-2">
                              Verification
                            </p>
                            <Select
                              value={selectedVerification}
                              placeholder={selectedVerification}
                              onChange={(e) => setSelectedVerification(e.value)}
                              options={options2}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={formikProps.handleSubmit}>
                      Proceed
                    </Button>{" "}
                    <Button
                      color="secondary"
                      onClick={() => setModalRight(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            )}
          </Formik>
        </div>
      </Card>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
// export default React.memo(ThumbListView);

export default ThumbListView;
