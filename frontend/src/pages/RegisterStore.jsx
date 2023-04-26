import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterStore = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    store_name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/my-store/update/${username}`,
        formData
      );
      console.log(response);
      alert("Store name is successfully registered");
      localStorage.setItem("store_name", formData.store_name);
      navigate("/my-store");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Fail to register store name");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h3>You don't have a store name yet</h3>
      <Form className="my-form-control form-container" onSubmit={handleSubmit}>
        <Form.Group controlId="formStoreName">
          <Form.Label>
            Register Your Store Name Here (Must be Unique)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter store number"
            name="store_name"
            value={formData.store_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterStore;
