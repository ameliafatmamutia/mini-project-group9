import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyStore = () => {
  const navigate = useNavigate();
  const storeName = localStorage.getItem("store_name");

  return (
    <div>
      {storeName === "null" ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h3>You don't have a store name yet</h3>
          <Button onClick={() => navigate("/my-store/register")}>
            Register Your Store Name Here
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div>
            <h4>Store Name: {storeName}</h4>
          </div>
          <Row>
            <Col>
              <Button
                size="lg"
                onClick={() => navigate("/my-store/my-product")}
              >
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
      )}
    </div>
  );
};

export default MyStore;
