import React from "react";
import "../assets/styles/product_card.css";

const ProductCard = (props) => {
  console.log(props, "in product card");
  const { product } = props;

  return (
    <div className="card product-card">
      <img src={product.Img} alt="" />
      <div className="mt-2">
        <div>
          <h6>{product.Product_Name}</h6>
          <span className="text-muted">IDR {product.Price}</span>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button className="btn btn-primary mt-2">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
