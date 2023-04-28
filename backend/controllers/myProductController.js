const { db, query } = require("../database");

module.exports = {
  // bikin controller untuk fetch product by store_name
  fetchProductByStoreName: async (req, res) => {
    const { store_name } = req.params;

    let getProductByStoreQuery = `SELECT * FROM products INNER JOIN categories ON products.Id_Category = categories.Id_Category WHERE Store_Name = ${db.escape(
      store_name
    )} `;

    try {
      let result = await query(getProductByStoreQuery);
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get product from ${store_name}`,
          data: result,
        });
      } else {
        res.status(200).send({ message: "Product not found", data: [] });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server error" });
    }
  },
  // bikin controller untuk post product by store_name
  postProduct: async (req, res) => {
    try {
      const {
        Store_Name,
        Product_Name,
        Description,
        Price,
        Id_Category,
        Stock,
        Img,
      } = req.body;

      let postProductQuery = `INSERT INTO products (Store_Name, Product_Name, Description, Price, Id_Category, Stock, Img) VALUES ( ${db.escape(
        Store_Name
      )}, ${db.escape(Product_Name)}, ${db.escape(Description)}, ${db.escape(
        Price
      )}, ${db.escape(Id_Category)}, ${db.escape(Stock)}, ${db.escape(Img)});`;

      let addProductResult = await query(postProductQuery);
      res.status(200).send({ message: "Add Product Success" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server error" });
    }
  },
  // bikin controller untuk edit product by Id_Product
  updateProductById: async (req, res) => {
    const { editId } = req.params;
    const { Product_Name, Description, Price, Id_Category, Stock, Img } =
      req.body;
    const sqlQuery = `UPDATE products SET Product_Name = ${db.escape(
      Product_Name
    )}, Description = ${db.escape(Description)}, Price = ${db.escape(
      Price
    )}, Id_Category = ${db.escape(Id_Category)}, Stock = ${db.escape(
      Stock
    )}, Img = ${db.escape(Img)} WHERE Id_Product = ${db.escape(editId)};`;

    try {
      const result = await query(sqlQuery);
      if (result.affectedRows === 0) {
        res.status(200).send({ message: "No data is changed" });
      } else {
        res.status(200).send({
          message: `Product data of id: ${editId} is updated successfully`,
        });
      }
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  // bikin controller untuk deactivate product by Id_Product
  deactivateProduct: async (req, res) => {
    const { Id_Product } = req.params;
    const sqlQuery = `UPDATE products SET Is_Active = 0 WHERE Id_Product = ${db.escape(
      Id_Product
    )};`;

    try {
      const result = await query(sqlQuery);
      if (result.affectedRows === 0) {
        res.status(200).send({ message: "Fail to deactivate" });
      } else {
        res.status(200).send({
          message: `Product data of id: ${Id_Product} is successfully deactivated`,
        });
      }
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  // bikin controller untuk activate product by Id_Product
  activateProduct: async (req, res) => {
    const { Id_Product } = req.params;
    const sqlQuery = `UPDATE products SET Is_Active = 1 WHERE Id_Product = ${db.escape(
      Id_Product
    )};`;

    try {
      const result = await query(sqlQuery);
      if (result.affectedRows === 0) {
        res.status(200).send({ message: "Fail to activate" });
      } else {
        res.status(200).send({
          message: `Product data of id: ${Id_Product} is successfully activated`,
        });
      }
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  // bikin controller untuk delete product by Id_Product
  deleteProduct: async (req, res) => {
    const { Id_Product } = req.params;
    const sqlQuery = `DELETE FROM products WHERE Id_Product = ${db.escape(
      Id_Product
    )};`;

    try {
      const result = await query(sqlQuery);
      if (result.affectedRows === 0) {
        res.status(200).send({ message: "Fail to delete" });
      } else {
        res.status(200).send({
          message: `Product data of id: ${Id_Product} is successfully deleted`,
        });
      }
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
