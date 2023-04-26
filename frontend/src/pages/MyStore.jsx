import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyStore = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get(`http://localhost:8000/my-store/${username}`)
      .then((response) => {
        setMessage(response.data.message);

        if (response.data.message === "You already have a store name") {
          localStorage.setItem("store_name", response.data.data.store_name);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Terjadi kesalahan di server");
      });
  }, []);

  return (
    <div>
      {message === "You don't have a store name yet" ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h3>You don't have a store name yet</h3>
          <Button onClick={() => navigate("/my-store/register")}>
            Register Your Store Name Here
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Row>
            <Col>
              <Button size="lg" block>
                My Product
              </Button>
            </Col>
            <Col>
              <Button size="lg" block>
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
