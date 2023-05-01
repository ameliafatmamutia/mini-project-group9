import React, { useState } from "react";
import Axios from "axios";
import { Button, Form } from "react-bootstrap";

const NewCategory = () => {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!category) {
      alert("Category name cannot be empty");
      return;
    }
  
    try {
      const response = await Axios.post(
        `http://localhost:8000/my-store/my-product/new-category`,
        { category }
      );
      console.log(response.data);
      alert("New category is successfully added");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Add new category failed");
    }
  };
  

  return (
    <div>
      <Form className="my-form-control form-container" onSubmit={handleSubmit}>
        <Form.Group controlId="New_Category">
          <Form.Control
            type="text"
            placeholder="Enter New Category"
            name="Category_Name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Add New Category
        </Button>
      </Form>
    </div>
  );
};

export default NewCategory;
