import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  Badge,
  CardHeader,
  CardTitle,
} from "reactstrap";
import LoginTruck from "../Assets/LoginTruck.jpg";
import Logo from "../Assets/logo.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import "./css/Login.css";
import { baseUrl } from "../Assets/serverdetails";

const signupSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email should have a proper format"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  mobile: yup.string().required("Mobile no is required"),
  position: yup.string().required("Position is required"),
});
function Register() {
  const history = useHistory();

  return (
    <div>
      <Row className="top pl-4 pr-4">
        <p>Uberized-Truck</p>
        <Col lg="1" xs="3" md="2">
          <img
            alt="outwig-logo"
            src={Logo}
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => history.push("./dashboard")}
          />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              mobile: "",
              position: "",
            }}
            validationSchema={signupSchema}
            onSubmit={(values, actions) => {
              console.log("hello", values);
              axios({
                method: "post",
                url: `${baseUrl}/user/createaccount`,
                data: {
                  email: values.email,
                  password: values.password,
                  username: values.username,
                  mobile: values.mobile,
                  position: values.position,
                },
              })
                .then((response) => {
                  console.log("res", response);
                })
                .catch((error) => {
                  console.log("error", error);
                });
            }}
          >
            {(formikProps) => (
              <div>
                <center>
                  <Row>
                    <Col lg="12">
                      <img
                        alt="Uber-logo"
                        src={LoginTruck}
                        style={{ width: "70%" }}
                      />
                    </Col>
                  </Row>
                  <h2>Welcome!</h2>
                  <p>Please create an account to continue!</p>
                  <Row>
                    <Col lg="12">
                      <Input
                        placeholder="Choose a Email"
                        value={formikProps.values.email}
                        onChange={formikProps.handleChange("email")}
                        onBlur={formikProps.handleBlur("email")}
                      />
                      <div className="error">
                        {formikProps.touched.email && formikProps.errors.email}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <Input
                        placeholder="Choose a username"
                        className="mt-2"
                        value={formikProps.values.username}
                        onChange={formikProps.handleChange("username")}
                        onBlur={formikProps.handleBlur("username")}
                      />
                      <div className="error">
                        {formikProps.touched.username &&
                          formikProps.errors.username}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg="12">
                      <Input
                        placeholder="Password"
                        value={formikProps.values.password}
                        onChange={formikProps.handleChange("password")}
                        onBlur={formikProps.handleBlur("password")}
                        type="password"
                      />
                      <div className="error">
                        {formikProps.touched.password &&
                          formikProps.errors.password}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg="12">
                      <Input
                        placeholder="Mobile no"
                        value={formikProps.values.mobile}
                        onChange={formikProps.handleChange("mobile")}
                        onBlur={formikProps.handleBlur("mobile")}
                        type="text"
                      />
                      <div className="error">
                        {formikProps.touched.mobile &&
                          formikProps.errors.mobile}
                      </div>
                    </Col>
                  </Row>
                  <h3>As </h3>
                  <Row>
                    <Col>
                      <Input
                        id="position"
                        type="radio"
                        value="driver"
                        name="position"
                        onChange={formikProps.handleChange("position")}
                        defaultChecked={
                          formikProps.values.position === "driver"
                        }
                      />
                      <label htmlFor="driver">Driver</label>
                      <br />
                      <h3>Or</h3>
                      <Input
                        id="position"
                        type="radio"
                        value="client"
                        name="position"
                        onChange={formikProps.handleChange("position")}
                        defaultChecked={
                          formikProps.values.position === "client"
                        }
                      />
                      <label htmlFor="client">Client</label>
                    </Col>
                  </Row>
                  <Button
                    color="primary"
                    className="mt-2"
                    style={{
                      borderRadius: "0px 0px 20px 20px",
                    }}
                    onClick={formikProps.handleSubmit}
                  >
                    Register
                  </Button>
                  <p>Already have account? </p>
                  <Badge
                    onClick={() => history.push("/login")}
                    className="signuplink"
                  >
                    Please Login
                  </Badge>
                </center>
              </div>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
