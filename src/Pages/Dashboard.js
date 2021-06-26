import React from "react";
import { useHistory } from "react-router-dom";

import "./css/Dashboard.css";
import { Card, CardBody, Button, CardHeader, Row, Col } from "reactstrap";
function Dashboard() {
  const history = useHistory();
  return (
    <div>
      <Card>
        <CardHeader>
          <center>Welcome!</center>
        </CardHeader>
        <CardBody>
          <Row style={{ minHeight: "500px" }}>
            <Col md="6" className="middles">
              <h3>Signin</h3>
              <Button onClick={() => history.push("./login")}>
                As Driver
              </Button>{" "}
              <Button onClick={() => history.push("./login")}>As client</Button>{" "}
            </Col>
            <Col md="6" className="middles">
              <h3>Sign Up</h3>
              <Button
                color="primary"
                onClick={() => history.push("./register")}
                className="mb-2"
              >
                {" "}
                register
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dashboard;
