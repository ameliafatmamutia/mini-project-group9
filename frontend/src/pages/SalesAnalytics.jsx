import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SalesAnalytics = () => {
  const navigate = useNavigate();
  const storeName = localStorage.getItem("store_name");
  return (
    <div>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div>
          <h4>Store Name: {storeName}</h4>
        </div>
        <Row>
          <Col>
            <Button size="lg" onClick={() => navigate("/my-store/my-product")}>
              My Product
            </Button>
          </Col>
          <Col>
            <Button
              size="lg"
              onClick={() => navigate("/my-store/sales-analytics")}
            >
              Sales Analytics
            </Button>
          </Col>
        </Row>
      </div>
      <div>
        <h3>Sales Analytics Page</h3>
      </div>
    </div>
  );
};

export default SalesAnalytics;
