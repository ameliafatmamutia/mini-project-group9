const { db, query } = require("../database");

module.exports = {
  checkStoreName: async (req, res) => {
    const { username } = req.params;

    let getStoreQuery = `SELECT store_name FROM users WHERE username=${db.escape(
      username
    )}`;

    let doesHaveStore = await query(getStoreQuery);

    if (doesHaveStore[0].store_name !== null) {
      return res.status(200).send({
        data: doesHaveStore[0].store_name,
        message: "You already have a store name",
      });
    }

    return res.status(200).send({ message: "You don't have a store name yet" });
  },
  registerStoreName: async (req, res) => {
    const { username } = req.params;
    const { store_name } = req.body;

    let checkStoreQuery = `SELECT * FROM users WHERE store_name = ${db.escape(
      store_name
    )}`;

    let isStoreNameExist = await query(checkStoreQuery);
    if (isStoreNameExist == 0) {
      const registerStoreQuery = `UPDATE users SET store_name = ${db.escape(
        store_name
      )} WHERE username=${db.escape(username)}`;

      try {
        const result = await query(registerStoreQuery);
        if (result.affectedRows === 0) {
          res.status(400).send({ message: "Fail to update data" });
        } else {
          res
            .status(200)
            .send({ message: "Store name is created successfully" });
        }
      } catch (err) {
        res.status(500).send({ message: "Internal server error" });
      }
    }
  },
};
