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
import { AdminloginRequest } from "../Services/AdminService";
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must have proper format"),
  password: yup.string().required("Password is required"),
});
function AdminLogin() {
  const history = useHistory();

  return (
    <div>
      <Card>
        <CardBody>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              console.log("values", values);
              AdminloginRequest({
                email: values.email,
                password: values.password,
              })
                .then((response) => {
                  console.log("response", response);
                  if (response.data.admin) {
                    history.push(`/admin-users`, {
                      data: response?.data?.admin?._id,
                    });
                  } else {
                    window.alert("Wrong Password");
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                });
            }}
          >
            {(formikProps) => (
              <div>
                <center>
                  <Row
                    style={{
                      //   border: "1px solid black",
                      height: "57vh",
                    }}
                    className="mb-3"
                  >
                    <Col lg="12">
                      <img
                        alt="Uber-logo"
                        src={LoginTruck}
                        style={{
                          width: "80%",
                          height: "60%",
                          //   border: "1px solid black",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="10">
                      <Input
                        placeholder="Email"
                        value={formikProps.values.email}
                        onChange={formikProps.handleChange("email")}
                        onBlur={formikProps.handleBlur("email")}
                      />
                      <div className="error">
                        {formikProps.touched.email && formikProps.errors.email}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg="10">
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
                    onClick={formikProps.handleSubmit}
                    color="primary"
                    // className="mt-4"
                    style={{
                      borderRadius: "0px 0px 20px 20px",
                      marginTop: "7%",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </Button>
                </center>
              </div>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
}

export default AdminLogin;
