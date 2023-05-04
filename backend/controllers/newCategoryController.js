const { db, query } = require("../database");

// Create a new category
module.exports = {
  newCategory: async (req, res, next) => {
    const { category } = req.body;

    let checkCategoryQuery = `SELECT * FROM categories WHERE Category_Name = ${db.escape(
      category
    )}`;

    let isCategoryExist = await query(checkCategoryQuery);

    if (isCategoryExist.length === 0) {
      const addNewCategoryQuery = `INSERT INTO categories (Category_Name) VALUES (${db.escape(
        category
      )})`;

      try {
        await query(addNewCategoryQuery);
        res.status(200).send({ message: "Success" });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).send({ message: "Category already exists" });
    }
  },
};
