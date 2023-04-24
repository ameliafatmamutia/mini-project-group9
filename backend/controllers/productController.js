const { db, query } = require("../database");

module.exports = {
  getProduct: async (req, res) => {
    const { name, category, sortBy, sortOrder, page, limit } = req.query;
    const pageLimit = limit || 9;

    let sql = "SELECT * FROM products";
    const values = [];
    if (name) {
      sql += " WHERE Product_Name LIKE ?";
      values.push(`%${name}%`);
    }
    if (category) {
      sql += name ? " AND" : " WHERE";
      sql += " Id_Category = ?";
      values.push(category);
    }
    if (sortBy) {
      switch (sortBy) {
        case "price":
          sql += " ORDER BY Price";
          break;
        case "name":
          sql += " ORDER BY Product_Name";
          break;
        default:
          sql += " ORDER BY Id_Product";
          break;
      }
      if (sortOrder === "desc") {
        sql += " DESC";
      } else {
        sql += " ASC";
      }
    }

    const item = await query(sql, values);

    if (page && pageLimit) {
      const offset = (page - 1) * pageLimit;
      sql += " LIMIT ?, ?";
      values.push(offset, Number(pageLimit));
    }

    console.log(item.length, pageLimit, Math.ceil(item.length / pageLimit));

    const totalPages = Math.ceil(item.length / pageLimit);

    await query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.status(200).json({
        message: `success get all product list`,
        totalPages: totalPages,
        data: result,
      });
    });
  },
};
