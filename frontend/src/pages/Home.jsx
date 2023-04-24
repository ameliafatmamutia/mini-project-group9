import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8000/products?page=${currentPage}&name=${searchName}&category=${searchCategory}${
            sortOption
              ? `&sortBy=${sortOption.split("-")[0]}&sortOrder=${
                  sortOption.split("-")[1]
                }`
              : ""
          }`
        );
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        alert("Terjadi kesalahan di server.");
      }
    };
    fetchProducts();
  }, [currentPage, searchName, searchCategory, sortOption]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderProducts = () => {
    return products.map((product) => {
      return <ProductCard product={product} />;
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3">
          <div className="card">
            <div className="card-header">
              <strong>Filter Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchName">Product Name</label>
              <input
                name="searchName"
                type="text"
                className="form-control mb-3"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <label htmlFor="searchCategory">Product Category</label>
              <select
                name="searchCategory"
                className="form-control"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">All Items</option>
                <option value="1">Fashion</option>
                <option value="2">Electronics</option>
                <option value="3">Household Appliances</option>
                <option value="4">Beauty</option>
                <option value="5">Foods</option>
              </select>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">
              <strong>Sort Products</strong>
            </div>
            <div className="card-body">
              <label htmlFor="searchCategory">Sort by</label>
              <select
                name="searchCategory"
                className="form-control"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-asc">Lowest Price</option>
                <option value="price-desc">Highest Price</option>
                <option value="name-asc">A-Z</option>
                <option value="name-desc">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className="btn btn-dark"
              >
                {"<"}
              </button>
              <div className="text-center">
                Page {currentPage} of {totalPages}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className="btn btn-dark"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex flex-wrap flex-row">{renderProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
