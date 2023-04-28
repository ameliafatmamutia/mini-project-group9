const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (request, response) => {
    const { username, email, password, phone_number } = request.body;

    let getUsernameQuery = `SELECT * FROM users WHERE username=${db.escape(
      username
    )}`;
    let isUsernameExist = await query(getUsernameQuery);
    if (isUsernameExist.length > 0) {
      return response.status(400).send({ message: "Username has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const sql =
      "INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)";
    const values = [username, email, hashPassword, phone_number];
    let addUserResult = await query(sql, values);
    return response
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const isUsernameExist = await query(
        `SELECT * FROM users WHERE username=${db.escape(username)}`
      );
      if (isUsernameExist.length == 0) {
        return res
          .status(400)
          .send({ message: "Username or password is invalid" });
      }

      const isValid = await bcrypt.compare(
        password,
        isUsernameExist[0].password
      );

      if (!isValid) {
        return res
          .status(400)
          .send({ message: "Username or password is invalid" });
      }

      let payload = {
        id: isUsernameExist[0].id_users,
      };
      const token = jwt.sign(payload, "amel", { expiresIn: "1h" });
      return res.status(200).send({
        token,
        message: "Login berhasil",
        username: `${isUsernameExist[0].username}`,
        store_name: `${isUsernameExist[0].store_name}`,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  fetchUsers: async (req, res) => {
    let fetchQuery = "SELECT * FROM users";
    let allUsers = await query(fetchQuery);
    return res.status(200).send({ data: allUsers });
  },
};
