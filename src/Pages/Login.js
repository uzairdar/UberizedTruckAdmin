import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Input,
  Button,
  CardHeader,
  CardTitle,
} from "reactstrap";
import LoginTruck from "../Assets/LoginTruck.jpg";
import Logo from "../Assets/logo.svg";

import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import "./css/Login.css";
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must have proper format"),
  password: yup.string().required("Password is required"),
});
function Login() {
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
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {}}
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
                  <h2>Welcome Back!</h2>
                  <Row>
                    <Col lg="12">
                      <Input
                        placeholder="Username"
                        value={formikProps.values.username}
                        onChange={formikProps.handleChange("email")}
                        onBlur={formikProps.handleBlur("email")}
                      />
                      <div className="error">
                        {formikProps.touched.email && formikProps.errors.email}
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
                  <Button
                    color="primary"
                    className="mt-2"
                    style={{
                      borderRadius: "0px 0px 20px 20px",
                    }}
                    onClick={formikProps.handleSubmit}
                  >
                    Login
                  </Button>
                  <p>Do you have an account?</p>
                  <Badge
                    onClick={() => history.push("/register")}
                    className="signuplink"
                  >
                    Sign Up
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

export default Login;
