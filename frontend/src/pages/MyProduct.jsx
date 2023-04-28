import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const navigate = useNavigate();
  const storeName = localStorage.getItem("store_name");

  const [products, setProducts] = useState([]);

  const initialState = {
    Store_Name: storeName,
    Product_Name: "",
    Description: "",
    Price: 0,
    Id_Category: 0,
    Stock: 0,
    Img: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [editId, setEditId] = useState(0);

  const [editForm, setEditForm] = useState({
    editProductName: "",
    editDescription: "",
    editPrice: 0,
    editCategory: 0,
    editStock: 0,
    editProductImage: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setFormData({ ...formData, Id_Category: categoryId });
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setEditForm({ ...editForm, [name]: value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8000/my-store/my-product/${storeName}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
        alert("terjadi kesalahan di server", error);
      }
    };
    fetchProducts();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post(
        "http://localhost:8000/my-store/my-product",
        formData
      );
      console.log(response.data);
      alert("New Product is successfully added");
      setFormData(initialState);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Register fail. Data is incomplete");
    }
  };

  const editToggle = (editData) => {
    setEditId(editData.Id_Product);
    setEditForm({
      editProductName: editData.Product_Name,
      editDescription: editData.Description,
      editPrice: editData.Price,
      editCategory: editData.Id_Category,
      editStock: editData.Stock,
      editProductImage: editData.Img,
    });
  };

  const cancelEdit = () => {
    setEditId(0);
  };

  const saveButtonHandler = async () => {
    try {
      const response = await Axios.patch(
        `http://localhost:8000/my-store/my-product/update/${editId}`,
        {
          Product_Name: editForm.editProductName,
          Description: editForm.editDescription,
          Price: editForm.editPrice,
          Id_Category: editForm.editCategory,
          Stock: editForm.editStock,
          Img: editForm.editProductImage,
        }
      );
      console.log(response);
      alert("Edit data success");
      cancelEdit();
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  const deactivateButtonHandler = async (Id_Product) => {
    try {
      const response = await Axios.patch(
        `http://localhost:8000/my-store/my-product/deactivate/${Id_Product}`
      );
      console.log(response);
      alert(`Product with ID ${Id_Product} is successfully deactivated`);
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  const activateButtonHandler = async (Id_Product) => {
    try {
      const response = await Axios.patch(
        `http://localhost:8000/my-store/my-product/activate/${Id_Product}`
      );
      console.log(response);
      alert(`Product with ID ${Id_Product} is successfully activated`);
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  const renderProducts = () => {
    return products.map((product) => {
      if (product.Id_Product === editId) {
        return (
          <tr>
            <td>{product.Id_Product}</td>
            <td>
              <input
                value={editForm.editProductName}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductName"
              />
            </td>
            <td>
              <input
                value={editForm.editPrice}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editPrice"
              />
            </td>
            <td>
              <input
                value={editForm.editProductImage}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editProductImage"
              />
            </td>
            <td>
              <input
                value={editForm.editDescription}
                onChange={inputHandler}
                type="text"
                className="form-control"
                name="editDescription"
              />
            </td>
            <td>
              <input
                value={editForm.editStock}
                onChange={inputHandler}
                type="number"
                className="form-control"
                name="editStock"
              />
            </td>
            <td>
              <select
                value={editForm.editCategory}
                onChange={inputHandler}
                name="editCategory"
                className="editCategory"
              >
                <option value="0">Select Category</option>
                <option value="1">Fashion</option>
                <option value="2">Electronics</option>
                <option value="3">Household Appliances</option>
                <option value="4">Beauty</option>
                <option value="5">Foods</option>
              </select>
            </td>
            <td>{product.Is_Active === 1 ? "Active" : "Not Active"}</td>
            <td>
              <button className="btn btn-primary" onClick={saveButtonHandler}>
                Save
              </button>
            </td>
            <td>
              <button className="btn btn-danger" onClick={cancelEdit}>
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <td>{product.Id_Product}</td>
          <td>{product.Product_Name}</td>
          <td>{product.Price}</td>
          <td>
            <img
              src={product.Img}
              alt=""
              style={{ height: "250px", width: "250px" }}
            />
          </td>
          <td>{product.Description}</td>
          <td>{product.Stock}</td>
          <td>{product.Category_Name}</td>
          <td>{product.Is_Active === 1 ? "Active" : "Not Active"}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => editToggle(product)}
            >
              Edit
            </button>
          </td>
          <td>
            {product.Is_Active === 1 ? (
              <button
                onClick={() => deactivateButtonHandler(product.Id_Product)}
                className="btn btn-secondary"
              >
                Deactivate
              </button>
            ) : (
              <button
                onClick={() => activateButtonHandler(product.Id_Product)}
                className="btn btn-success"
              >
                Activate
              </button>
            )}
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });
  };

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
        <div className="p-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1>Manage Products</h1>
              <table className="table mt-4">
                <thead className="thead-light">
                  <tr>
                    <th>ID Product</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th colSpan="3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="100%">There is no product yet</td>
                    </tr>
                  ) : (
                    renderProducts()
                  )}
                </tbody>
              </table>
              <br />
              <Form
                className="my-form-control form-container"
                onSubmit={handleSubmit}
              >
                <Form.Group controlId="Product_Name">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    name="Product_Name"
                    value={formData.Product_Name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="Description">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product description"
                    name="Description"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="Price">
                  <Form.Label>Price (IDR)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Product Price in IDR"
                    name="Price"
                    value={formData.Price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="Stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of product stock"
                    name="Stock"
                    value={formData.Stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="Image">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product image URL"
                    name="Img"
                    value={formData.Img}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="Id_Category">
                  <Form.Label>Choose Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="Id_Category"
                    value={formData.Id_Category}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="0">Select Category</option>
                    <option value="1">Fashion</option>
                    <option value="2">Electronics</option>
                    <option value="3">Household Appliances</option>
                    <option value="4">Beauty</option>
                    <option value="5">Foods</option>
                  </Form.Control>
                </Form.Group>
                <br />
                <br />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Add New Product
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
